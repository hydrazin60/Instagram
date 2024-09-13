import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataUri } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CreatePost({ open, setOpen }) {
  const imageRef = useRef();
  const [image, setImage] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [loding, setLoding] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const dataUri = await readFileAsDataUri(file);
      setImagePreview(dataUri);
    }
  };

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", imagePreview);
    try {
      setLoding(true);
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/post/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setLoding(false);
        setOpen(false);
        setCaption("");
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoding(false);
    }
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center items-center text-lg font-semibold">
          Create New Post
        </DialogHeader>
        <hr className="border-slate-800" />
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePic} alt="post image" />
            <AvatarFallback className="font-semibold text-xl bg-zinc-500">
              {getInitials(user?.username)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm">{user?.username}</h1>
            <span className="text-sm text-gray-600">Bio here...</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border-none focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="post image"
            className="w-full h-72 object-cover rounded-md"
          />
        )}
        <input
          type="file"
          ref={imageRef}
          className="hidden"
          onChange={fileChangeHandler}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="mx-auto bg-[#0095f6] hover:bg-[#0095f6]/90 font-semibold"
        >
          Select from computer
        </Button>
        {imagePreview &&
          (loding ? (
            <Button className=" flex gap-2 font-semibold">
              Uploading
              <Loader2 className=" items-center animate-spin font-semibold" />
            </Button>
          ) : (
            <Button onClick={createPostHandler} className=" font-semibold">
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
}
