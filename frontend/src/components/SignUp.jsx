import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false);
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoding(true);
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      if (res.data.success) {
        navigate("/sign-in");
        toast.success(res.data.message);
        setInput({
          email: "",
          username: "",
          password: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data); // Check the error response
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoding(false);
    }
  };
  return (
    <div className="flex   w-screen h-screen  justify-center ">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-5  p-3 rounded-xl w-1/4 h-3/4 my-auto  bg-slate-50"
      >
        <div className="my-4 text-center ">
          <h1 className="text-3xl font-bold text-center">Instagram</h1>
          <p className="font-bold text-zinc-500">
            Signup to see photos and videos from your friends
          </p>
        </div>
        <div>
          <Input
            placeholder="enter your email"
            type="email"
            name="email"
            value={input.email}
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Input
            placeholder="username"
            type="text"
            name="username"
            value={input.username}
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={input.password}
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <Button type="submit">{loding ? "Loading..." : "Sign Up"} </Button>
        <span>
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-600"> Login </span>
          </Link>
        </span>
      </form>
    </div>
  );
}
