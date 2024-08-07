"use client";

import { HomeUser, ProfileUser } from "@/model/user";
import React from "react";
import useSWR from "swr";
import Button from "./ui/Button";
import { useSession } from "next-auth/react";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: session } = useSession();
  const { data: loggedInUser } = useSWR<HomeUser>(session ? "/api/me" : null);

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
}
