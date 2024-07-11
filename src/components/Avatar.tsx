import React from "react";

type Props = {
  imageUrl?: string | null;
};

export default function Avatar({ imageUrl }: Props) {
  return (
    <div className="p-1 w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      <img
        className="rounded-full"
        src={imageUrl ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
