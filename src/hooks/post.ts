import { Comment, FullPost } from "@/model/post";
import useSWR from "swr";

async function postComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const addComment = (comment: Comment) => {
    if (!post) return;

    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(postComment(postId, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { post, isLoading, error, addComment };
}
