import { FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

import { Back, Error, Spinner, Tag } from "components";

const PostDetailsPage: FC = () => {
  const { id } = useParams();

  const fetchPost = async (): Promise<Post> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/posts/${id}`
    );
    return data;
  };

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(["posts"], () => fetchPost());

  return (
    <AnimatePresence>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Error />
      ) : (
        <>
          <Back />
          <div className="mt-4 tracking-wide leading-6 text-center font-medium mx-4 md:mx-10 text-lg md:text-xl">
            {post?.title}
          </div>
          {post?.tags && post?.tags?.length > 0 && (
            <ul className="flex items-center justify-center space-x-2 flex-wrap mt-4">
              {post?.tags.map((tag: string, index: number) => {
                return (
                  <li key={index}>
                    <Tag label={tag} noAction />
                  </li>
                );
              })}
            </ul>
          )}
          <img
            alt="post-thumbnail"
            className="w-full object-cover h-40 md:h-72 mt-4"
            src={post?.image}
          />
          <div className="text-left text-base text-gray font-light my-4 leading-5 tracking-wide">
            {post?.text}
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PostDetailsPage;
