import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostInput, postsService } from "@/services/posts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => postsService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Tạo bài viết mới thành công, ID mới là: ", data.id);
    },
    onError: (error) => {
      console.error("Lỗi khi tạo bài viết mới: ", error.message);
    },
    onSettled: () => {
      console.log("Mutation đã hoàn tất");
    },
  });
}
