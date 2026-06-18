"use client";
import { SkeletonCards } from "./SkeletonCard";
import { PostCards } from "./PostCards";
import { PaginationPostList } from "./PaginationPostList";
import { usePosts } from "@/hooks/use-posts";

interface Props {
  paginated?: boolean;
  limit?: number;
}

function StaticFeed({ limit }: { limit: number }) {
  const { data, isPending, isError, error } = usePosts();

  if (isPending) return <SkeletonCards />;
  if (isError) return <p className="state-error">Lỗi: {error.message}</p>;

  return <PostCards posts={(data?.data ?? []).slice(0, limit)} />;
}

export function PostList({ paginated = false, limit = 7 }: Props) {
  if (paginated) return <PaginationPostList />;
  return <StaticFeed limit={limit} />;
}
