import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService, Post, PaginatedPosts } from "@/services/posts";

export function useToggleLike(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (liked: boolean) => postsService.toggleLike(postId, liked),
    onSuccess: (updatedPost) => {
      const applyUpdate = (p: Post) =>
        p.id === updatedPost.id ? updatedPost : p;

      queryClient.setQueriesData<PaginatedPosts>(
        {
          queryKey: ["posts", "pagination"],
        },
        (old) => old && { ...old, data: old.data.map(applyUpdate) },
      );

      queryClient.setQueryData<PaginatedPosts>(["posts", "list"], (old) =>
        old && { ...old, data: old.data.map(applyUpdate) },
      );
    },
  });
}
