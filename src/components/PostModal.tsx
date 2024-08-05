import React, { MouseEvent } from "react";
import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  const handleClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <section
      onClick={handleClose}
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
    >
      <button onClick={onClose} className="fixed top-0 right-0 p-8 text-white">
        <CloseIcon />
      </button>
      <div className="w-4/5 max-w-7xl h-3/5 bg-white">{children}</div>
    </section>
  );
}
