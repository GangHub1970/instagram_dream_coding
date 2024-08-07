import React from "react";
import Avatar from "./Avatar";
import { AuthUser } from "@/model/user";

type Props = {
  user: AuthUser;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <aside>
      <div className="flex items-center">
        {image && <Avatar imageUrl={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-neutral-500">
        About﹒Help﹒Press﹒API﹒Jobs﹒Privacy﹒Terms﹒Location﹒Language
      </p>
      <p className="mt-8 font-bold text-sm text-neutral-500">
        @Copyright instagram from METAL
      </p>
    </aside>
  );
}
