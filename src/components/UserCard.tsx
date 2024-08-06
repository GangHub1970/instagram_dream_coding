import { UserSearchResult } from "@/model/user";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: UserSearchResult;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center mb-2 p-4 w-full rounded-sm border border-neutral-300 bg-white hover:bg-neutral-50"
    >
      <Avatar imageUrl={image} />
      <div className="ml-4 text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
