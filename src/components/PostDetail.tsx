import { SimplePost } from "@/model/post";
import Image from "next/image";
import React from "react";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/post";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image } = post;
  const { post: data, addComment } = useFullPost(id);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col basis-2/5 w-full">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="p-4 mb-1 h-full border-t border-gray-200 overflow-y-auto">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    imageUrl={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="mr-1 font-bold">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onPostComment={addComment} />
      </div>
    </section>
  );
}
