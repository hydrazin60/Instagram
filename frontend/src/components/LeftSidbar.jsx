import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost.components";

export default function LeftSidbar() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const LogoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/sign-in");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Logout error", error);
      toast.error(error.response.data.message);
    }
  };

  const createHandlerPost = async () => {
    setOpen(true);
  };

  const sideBarIcons = [
    {
      icon: <FaHome />,
      name: "Home",
    },
    {
      icon: <FaSearch />,
      name: "Search",
    },
    {
      icon: <FaRegCompass />,
      name: "Explore",
    },
    {
      icon: <MdOndemandVideo />,
      name: "reels",
    },
    {
      icon: <FaFacebookMessenger />,
      name: "Messages",
    },
    {
      icon: <FaHeart />,
      name: "Notifications",
    },
    {
      icon: <FaRegSquarePlus />,
      name: "CreatePost",
    },
    {
      icon: (
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profilePic} alt=" user pp" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
      ),
      name: "Profile",
    },
    {
      icon: <IoLogOut />,
      name: "Logout",
    },
  ];

  const SidebarHandler = (name) => {
    if (name === "Logout") {
      if (window.confirm("Are you sure you want to logout?")) {
        LogoutHandler();
      }
    } else if (name === "Profile") {
      navigate(`/profile`);
    } else if (name === "CreatePost") {
      createHandlerPost();
    }
  };

  return (
    <div className="flex top-0 z-10 left-0 px-4 border-r border-gray-300 lg:w-[16%]    md:w-[22%] h-screen pt-10 ">
      <div className="flex flex-col gap-4 ">
        <h1
          className="instagram-logo text-3xl text-zinc-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Instagram
        </h1>
        <div className="flex flex-col lg:gap-3   ">
          {sideBarIcons.map((item, index) => (
            <div
              onClick={() => SidebarHandler(item.name)}
              key={index}
              className="flex items-center relative hover:bg-gray-200   cursor-pointer rounded-lg p-3 gap-3 text-lg lg:text-xl font-semibold "
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
}
