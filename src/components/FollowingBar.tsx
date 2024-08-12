"use client";

import Link from "next/link";
import React from "react";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/me";

export default function FollowingBar() {
  const { user, error, isLoading } = useMe();
  const users = user?.following;

  return (
    <section className="relative flex justify-center items-center p-4 mb-4 w-full min-h-[90px] rounded-lg shadow-sm shadow-neutral-300 overflow-x-auto z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following.`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
            >
              <Avatar imageUrl={image} highlight />
              <p className="text-center w-full text-sm text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
