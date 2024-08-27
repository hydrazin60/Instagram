import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { icons } from "lucide-react";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sidbarIcons = [
  { icon: <FaHome />, text: "Home" },
  { icon: <FaSearch />, text: "Search" },
  { icon: <FaFacebookMessenger />, text: "Messages" },
  { icon: <FaRegHeart />, text: "Notifications" },
  { icon: <FaRegPlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <CiLogout />, text: "Logout" },
];

export default function LeftSidebar() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/sign-in");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  };
  const sidebarHandler = (text) => {
    if (text === "Logout") {
      logoutHandler();
    }
  };
  return (
    <div className=" z-10 px-4 border-r border-slate-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Instagram</h1>
        {sidbarIcons.map((icon) => (
          <div
            key={icon.text}
            className="flex items-center gap-2 relative  hover:bg-gray-100 cursor-pointer rounded-lg  p-3  my-3"
            onClick={() => sidebarHandler(icon.text)}
          >
            <span className="text-xl">{icon.icon}</span>
            <p className="font-semibold">{icon.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
