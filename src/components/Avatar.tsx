import React from "react";

type Props = {
  imageUrl?: string | null;
  size?: "small" | "large";
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

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = "flex justify-center items-center rounded-full";
  const sizeStyle =
    size === "small" ? "p-[2px] w-9 h-9" : "p-1 w-[68px] h-[68px]";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";

  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getImageSizeStyle(size: string): string {
  return size === "small" ? "p-[0.1rem]" : "p-[0.2rem]";
}
