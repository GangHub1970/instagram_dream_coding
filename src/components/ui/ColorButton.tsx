import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className="p-1 rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      <button
        onClick={onClick}
        className="px-1 bg-white rounded-sm text-base hover:opacity-90 transition-opacity"
      >
        {text}
      </button>
    </div>
  );
}
