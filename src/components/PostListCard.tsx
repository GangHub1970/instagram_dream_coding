import { SimplePost } from "@/model/post";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import SmileIcon from "./ui/icons/SmileIcon";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, text, createdAt, likes } = post;

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar imageUrl={userImage} size="medium" highlight />
        <span className="ml-2 text-gray-900 font-bold">{username}</span>
      </div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        className="w-full object-cover aspect-square"
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
