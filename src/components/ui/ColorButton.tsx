import React from "react";

type Props = {
  text: string;
  size?: "small" | "large";
  onClick: () => void;
};

export default function ColorButton({ text, size = "small", onClick }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 ${
        size === "large" ? "p-[0.3rem]" : "p-1"
      }`}
    >
      <button
        onClick={onClick}
        className={`bg-white rounded-sm text-base hover:opacity-90 transition-opacity ${
          size === "large" ? "px-4 py-2" : "px-1"
        }`}
      >
        {text}
      </button>
    </div>
  );
}
