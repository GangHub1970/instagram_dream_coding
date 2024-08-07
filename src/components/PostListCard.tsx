"use client";

import { SimplePost } from "@/model/post";
import React, { useState } from "react";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, text, createdAt, likes } = post;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModalClick = () => {
    setOpenModal((prev) => !prev);
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
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
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
