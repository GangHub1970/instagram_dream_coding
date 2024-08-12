import React, { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisable = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      className="flex items-center px-3 border-t border-neutral-300"
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        className="ml-2 p-3 w-full border-none outline-none"
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisable}
        className={`ml-2 font-bold ${
          buttonDisable ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  );
}
