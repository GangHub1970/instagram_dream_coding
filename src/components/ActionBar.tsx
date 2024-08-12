"use client";

import React from "react";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFIllIcon from "./ui/icons/BookmarkFIllIcon";
import { SimplePost } from "@/model/post";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
};

export default function ActionBar({ post, children }: Props) {
  const { id, likes, username, text, createdAt, comments } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();
  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user && user ? user.bookmarks.includes(id) : false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFIllIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {children}
        <p className="my-2 text-xs text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
