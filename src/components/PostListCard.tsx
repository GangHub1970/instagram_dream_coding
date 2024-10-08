"use client";

import { Comment, SimplePost } from "@/model/post";
import React, { useState } from "react";
import Image from "next/image";
import ActionBar from "./ActionBar";
import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/posts";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { addComment } = usePosts();

  const handleOpenModalClick = () => {
    setOpenModal((prev) => !prev);
  };
  const handlePostComment = (comment: Comment) => {
    addComment(post, comment);
  };
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        className="w-full object-cover aspect-square"
        priority={priority}
        onClick={handleOpenModalClick}
      />
      <ActionBar post={post} onPostComment={handlePostComment}>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="my-2 font-bold text-sky-700"
            onClick={handleOpenModalClick}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={handleOpenModalClick}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
