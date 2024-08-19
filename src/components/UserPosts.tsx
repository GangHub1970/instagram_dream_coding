"use client";

import { ProfileUser } from "@/model/user";
import React, { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/contexts/CacheKeyContext";

type Props = {
  user: ProfileUser;
};

const queies = [
  { type: "posts", icon: <PostIcon />, title: "User posts" },
  {
    type: "likes",
    icon: <HeartIcon className="w-3 h-3" />,
    title: "Liked posts",
  },
  {
    type: "saved",
    icon: <BookmarkIcon className="w-3 h-3" />,
    title: "Saved posts",
  },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(queies[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {queies.map(({ type, icon, title }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`mx-12 p-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
          >
            <button className="scale-150 md:scale-100" aria-label={title}>
              {icon}
            </button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
