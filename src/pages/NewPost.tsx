import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { Input, NewPostHeader, Tag, TagInput, Textarea } from "components";

const defaultImgSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png";

const NewPostPage: FC = () => {
  const navigate = useNavigate();

  const goBack = (): void => navigate(-1);

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const createTag = (): void => {
    setTags((prev) => [...prev, tag]);
    setTag("");
  };

  const deleteTag = (tagValue: string): void => {
    const filteredTags = tags.filter((e: string) => e !== tagValue);
    setTags(filteredTags);
  };

  const clearInputs = (): void => {
    setTitle("");
    setDesc("");
    setTag("");
    setTags([]);
  };

  const { isLoading: mutationLoading, mutate } = useMutation(
    () =>
      axios
        .post(`${process.env.REACT_APP_URL}/posts`, {
          id: uuid(),
          title,
          text: desc,
          image: defaultImgSrc,
          likes: 0,
          tags,
          publishDate: new Date(),
          userId: process.env.REACT_APP_USERID,
        })
        .then(({ data }) => data),
    {
      onSuccess: () => {
        clearInputs();
        goBack();
      },
      onError: (e) => console.log(e),
    }
  );

  return (
    <div>
      <NewPostHeader mutate={mutate} mutationLoading={mutationLoading} />

      <div className="space-y-5 mt-10">
        <div>
          <Input
            className="w-full"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <Textarea
            className="w-full"
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div>
          <TagInput
            label="Tags"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            onCreate={createTag}
          />
        </div>
        <div>
          {tags && tags?.length > 0 && (
            <ul className="mt-3 flex items-center flex-wrap gap-x-1 gap-y-1">
              {tags?.map((tag: string, index: number) => {
                return (
                  <li key={index}>
                    <Tag label={tag} onDelete={deleteTag} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
