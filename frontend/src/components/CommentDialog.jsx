import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
export default function CommentDialog({ openCommentBox, setOpenCommentBox }) {
  return (
    <Dialog open={openCommentBox} onOpenChange={setOpenCommentBox}>
      <DialogContent
        onInteractOutside={() => setOpenCommentBox(false)}
        className="max-w-5xl  p-0 flex flex-col"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/360085714_1616525928846282_1033599316022958055_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HkTVxCyjCLgQ7kNvgHQA-c8&_nc_ht=scontent.fktm21-1.fna&_nc_gid=Ab_rUsNVOGjCxF_XL6NA0NV&oh=00_AYCjtgE5ANcIDxFGQsbWvmNbEITdIjOdpFaV5i84UYFdKg&oe=66D89F7D"
              alt="post_image"
              className="rounded-md  w-full h-full aspect-square object-cover"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-sm ">Username</Link>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal />
                </DialogTrigger>
                <DialogContent>
                  <button className="courser-pointer w-full text-[#ED4956] text-sm p-3 font-bold border-b-2">
                    Unfollow
                  </button>
                  <button className="courser-pointer w-full text-[#ED4956] text-sm p-3 font-bold border-b-2">
                    Add to favorites
                  </button>
                  <button className="courser-pointer w-full text-zinc-700   text-sm p-3  border-b-2">
                    Why you're seeing this ad?
                  </button>
                  <button className="courser-pointer w-full   text-sm p-3   text-zinc-700  border-b-2">
                    About instgram Ads
                  </button>
                  <button className="courser-pointer w-full   text-sm p-3   text-zinc-700  border-b-2">
                    Cancle
                  </button>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              <p> All comments </p>
              <p> All comments </p>
              <p> All comments </p>
              <p> All comments </p>
            </div>
            <div className="p-4">
              <div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-3 rounded-md outline-none border-2 border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
