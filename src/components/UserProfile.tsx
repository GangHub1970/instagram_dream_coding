import { ProfileUser } from "@/model/user";
import React from "react";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { name, username, image, followers, following, posts } = user;
  const info = [
    { title: "posts", data: posts },
    { title: "following", data: following },
    { title: "followers", data: followers },
  ];

  return (
    <section className="flex flex-col md:flex-row w-full justify-center items-center py-12 border-b border-neutral-300">
      <Avatar imageUrl={image} highlight size="xlarge" />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-4 my-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="mr-1 font-bold">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-center md:text-start text-xl font-bold">{name}</p>
      </div>
    </section>
  );
}
