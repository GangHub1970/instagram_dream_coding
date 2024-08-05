import React from "react";
import Avatar from "./Avatar";

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar imageUrl={image} size="medium" highlight />
      <span className="ml-2 text-gray-900 font-bold">{username}</span>
    </div>
  );
}
