import React from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import { SimplePost } from "@/model/post";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/posts";

export default function PostGrid() {
  const {
    posts,
    isLoading,
    error,
  } = usePosts();

  return (
    <div className="text-center w-full">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
