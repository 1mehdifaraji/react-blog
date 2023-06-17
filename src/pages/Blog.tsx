import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

import { Post, Spinner, Error, BlogHeader } from "components";

const BlogPage: FC = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [searchedBlogPosts, setSearchedBlogPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<any>(
      ["posts"],
      ({ pageParam = 1 }) => fetchPosts(pageParam),
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) =>
          lastPage?.length === Number(process.env.REACT_APP_LIMIT)
            ? allPages?.length + 1
            : undefined,
      }
    );

  const fetchPosts = async (pageParam: number) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/posts?_sort=publishDate&_order=desc&_page=${pageParam}&_limit=${process.env.REACT_APP_LIMIT}`
    );
    if (blogPosts?.length > 0) setBlogPosts((prev) => [...prev, ...data]);
    else {
      setBlogPosts(data);
    }
    return data;
  };

  const handleSearch = (): void => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/posts?q=${search}&_limit=${process.env.REACT_APP_LIMIT}`
      )
      .then(({ data }) => setSearchedBlogPosts(data))
      .catch((e) => console.log(e));
  };

  const handleLike = ({ likes, id, ...postProps }: Post): void => {
    const likeNumber = likes + 1;
    axios
      .put(`${process.env.REACT_APP_URL}/posts/${id}`, {
        ...postProps,
        likes: likeNumber,
      })
      .then(({ data }: { data: Post }) => {
        if (search && search?.length > 0) {
          const newBlogPosts = searchedBlogPosts.map(
            ({ ...allProps }: Post) => {
              let newPost = { ...allProps };
              if (allProps.id === data.id) newPost.likes = data.likes;
              return newPost;
            }
          );
          setSearchedBlogPosts(newBlogPosts);
        } else {
          const newBlogPosts = blogPosts.map(({ ...allProps }: Post) => {
            let newPost = { ...allProps };
            if (allProps.id === data.id) newPost.likes = data.likes;
            return newPost;
          });
          setBlogPosts(newBlogPosts);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (search === "") setSearching(false);
    else {
      setSearching(true);
      handleSearch();
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <div>
      <BlogHeader search={search} setSearch={setSearch} />

      <AnimatePresence>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Error />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {searching
              ? searchedBlogPosts?.length > 0 &&
                searchedBlogPosts.map(
                  (
                    {
                      id,
                      image,
                      likes,
                      publishDate,
                      tags,
                      text,
                      title,
                      userId,
                    },
                    index
                  ) => {
                    return (
                      <li key={index}>
                        <Post
                          id={id}
                          desc={text}
                          img={image}
                          tags={tags}
                          title={title}
                          author={String(userId)}
                          authorPhoto={image}
                          likes={likes}
                          onLike={() =>
                            handleLike({
                              id,
                              image,
                              likes,
                              publishDate,
                              tags,
                              text,
                              title,
                              userId,
                            })
                          }
                          publishedAt={publishDate}
                        />
                      </li>
                    );
                  }
                )
              : blogPosts &&
                blogPosts?.length > 0 &&
                blogPosts.map(
                  (
                    {
                      id,
                      image,
                      likes,
                      publishDate,
                      tags,
                      text,
                      title,
                      userId,
                    },
                    index
                  ) => {
                    return (
                      <li key={index}>
                        <Post
                          id={id}
                          desc={text}
                          img={image}
                          tags={tags}
                          title={title}
                          author={String(userId)}
                          authorPhoto={image}
                          likes={likes}
                          onLike={() =>
                            handleLike({
                              id,
                              image,
                              likes,
                              publishDate,
                              tags,
                              text,
                              title,
                              userId,
                            })
                          }
                          publishedAt={publishDate}
                        />
                      </li>
                    );
                  }
                )}
          </ul>
        )}
        {!isError && (
          <div
            key="spinner-loading"
            ref={ref}
            className={`${
              !hasNextPage ? "hidden" : "flex"
            } justify-center py-10`}
          >
            {isFetchingNextPage && <Spinner />}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
