import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { FaRegHeart } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { LuMessageCircle } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import CommentDialog from "./CommentDialog";
import { Input } from "./ui/input";

export default function Post() {
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const changeCommentEventHandler = (event) => {
    const inputText = event.target.value;
    if (inputText.trim()) {
      setCommentText(inputText);
    } else {
      setCommentText("");
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <h1> UserName </h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to favorites
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/360085714_1616525928846282_1033599316022958055_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HkTVxCyjCLgQ7kNvgHQA-c8&_nc_ht=scontent.fktm21-1.fna&_nc_gid=Ab_rUsNVOGjCxF_XL6NA0NV&oh=00_AYCjtgE5ANcIDxFGQsbWvmNbEITdIjOdpFaV5i84UYFdKg&oe=66D89F7D"
        alt="post_image"
        className="rounded-md my-2 w-full aspect-square object-cover"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaRegHeart className="text-2xl cursor-pointer hover:text-zinc-600 " />
          <LuMessageCircle
            onClick={() => setOpenCommentBox(!openCommentBox)}
            className="text-2xl cursor-pointer hover:text-zinc-600"
          />
          <PiTelegramLogoLight className="cursor-pointer text-2xl hover:text-zinc-600" />
        </div>
        <div>
          <CiBookmark className="text-2xl cursor-pointer hover:text-zinc-600 " />
        </div>
      </div>
      <div>
        <span className=" text-sm font-medium block mb-2 ">1k likes</span>
        <p>
          <span className="text-sm font-medium mr-2">Username</span>
          caption
        </p>
        <span
          onClick={() => setOpenCommentBox(!openCommentBox)}
          className="cursor-pointer"
        >
          View all 100 comments
        </span>
        <CommentDialog
          openCommentBox={openCommentBox}
          setOpenCommentBox={setOpenCommentBox}
        />
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={commentText}
            onChange={changeCommentEventHandler}
            placeholder="Add a comment..."
            className="w-full text-sm border-none focus:outline-none"
          />
          {commentText && <span className="text-[#3BADF8]">Post</span>}
        </div>
      </div>
    </div>
  );
}
