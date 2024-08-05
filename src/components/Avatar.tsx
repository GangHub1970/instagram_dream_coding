import React from "react";

type AvatarSize = "small" | "medium" | "large";

type Props = {
  imageUrl?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  imageUrl,
  size = "large",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`w-full h-full rounded-full bg-white object-cover ${getImageSizeStyle(
          size
        )}`}
        src={imageUrl ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "flex justify-center items-center rounded-full";
  const sizeStyle = getContainerSize(size);
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";

  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "p-[2px] w-9 h-9";
    case "medium":
      return "p-[2px] w-11 h-11";
    case "large":
      return "p-1 w-[68px] h-[68px]";
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "p-[0.1rem]";
    case "medium":
      return "p-[0.15rem]";
    case "large":
      return "p-[0.2rem]";
  }
}
