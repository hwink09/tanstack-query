"use client";

import { useOptimistic, useTransition } from "react";
import { useToggleLike } from "@/hooks/use-toggle-like";
import { Post } from "@/services/posts";

interface Props {
  post: Post;
  inline?: boolean;
}

export function LikeButton({ post, inline = false }: Props) {
  const { mutateAsync, isPending } = useToggleLike(post.id);
  const [isOptimisticPending, startTransition] = useTransition();
  const [optimisticPost, setOptimisticPost] = useOptimistic(
    post,
    (currentPost, liked: boolean) => ({
      ...currentPost,
      liked,
      likes: currentPost.likes + (liked ? 1 : -1),
    }),
  );

  const handleToggleLike = () => {
    const nextLiked = !optimisticPost.liked;

    startTransition(async () => {
      setOptimisticPost(nextLiked);

      try {
        await mutateAsync(nextLiked);
      } catch {
        // useOptimistic rolls the UI back when the mutation fails.
      }
    });
  };

  const disabled = isPending || isOptimisticPending;

  if (inline) {
    return (
      <button
        className={`like-btn ${optimisticPost.liked ? "like-btn-active" : ""}`}
        onClick={handleToggleLike}
        disabled={disabled}
      >
        {optimisticPost.liked ? "♥" : "♡"} {optimisticPost.likes}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">{post.title?.slice(0, 50)}</span>
      <button
        className={`like-btn ${optimisticPost.liked ? "like-btn-active" : ""}`}
        onClick={handleToggleLike}
        disabled={disabled}
      >
        {optimisticPost.liked ? "♥" : "♡"} {optimisticPost.likes}
      </button>
    </div>
  );
}
