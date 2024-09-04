import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

export default function Posts() {
  const posts = useSelector((state) => state.post.posts);
  if (!Array.isArray(posts)) {
    return <div>No posts available.</div>;
  }
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post}  />
      ))}
    </div>
  );
}
