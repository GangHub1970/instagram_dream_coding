import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  red?: boolean;
};

export default function Button({
  text,
  onClick,
  red,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-8 border-none rounded-md text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-sky-500"
      } ${disabled && "opacity-80"}`}
    >
      {text}
    </button>
  );
}
