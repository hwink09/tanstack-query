"use client";
import { useCreatePost } from "@/hooks/use-create-post";
import { useState } from "react";

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const { mutate, isPending, isSuccess } = useCreatePost();

  async function submitPost() {
    mutate({ title, body: "Nội dung mặc định cho bài viết mới" });
    setTitle("");
  }

  return (
    <div className="form-card">
      <p className="form-card-title">Viết bài mới</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) submitPost();
        }}
      >
        <div className="form-row">
          <input
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề bài viết..."
          />
          <button type="submit" disabled={isPending} className="btn-primary">
            {isPending ? "Đang đăng..." : "Đăng bài"}
          </button>
        </div>
        {isSuccess && <p className="form-success">✓ Đăng bài thành công!</p>}
      </form>
    </div>
  );
}
