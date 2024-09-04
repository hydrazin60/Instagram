import React from "react";
import Feed from "./Feed";
import useGetallPost from "@/hooks/useGetAllPost";

export default function Home() {
  useGetallPost ();
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
      </div>
    </div>
  );
}
