import React from "react";

type AvatarSize = "small" | "medium" | "large" | "xlarge";

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
        className={`w-full h-full rounded-full bg-white object-cover ${
          getImageSizeStyle(size).image
        }`}
        src={imageUrl ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "flex justify-center items-center rounded-full";
  const { container } = getImageSizeStyle(size);
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";

  return `${baseStyle} ${container} ${highlightStyle}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case "small":
      return { container: "p-[2px] w-9 h-9", image: "p-[0.1rem]" };
    case "medium":
      return { container: "p-[2px] w-11 h-11", image: "p-[0.15rem]" };
    case "large":
      return { container: "p-[3px] w-[68px] h-[68px]", image: "p-[0.2rem]" };
    case "xlarge":
      return { container: "p-1 w-[142px] h-[142px]", image: "p-1" };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
