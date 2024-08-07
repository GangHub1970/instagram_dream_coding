import Avatar from "@/components/Avatar";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/services/user";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }
  return <UserProfile user={user} />;
}
