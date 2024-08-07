"use client";

import { HomeUser } from "@/model/user";
import Link from "next/link";
import React from "react";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR<HomeUser>("/api/me");
  const users = data?.following;

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
