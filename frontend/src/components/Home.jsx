import React from "react";
import Feed from "./Feed";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
      </div>
    </div>
  );
}
