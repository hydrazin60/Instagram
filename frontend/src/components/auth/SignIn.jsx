import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="flex justify-center flex-col items-center gap-4 m-8">
      <form className="shadow-md rounded px-8 pt-6 pb-8  bg-white border border-gray-300 max-w-sm w-full">
        <div className="my-4 flex flex-col items-center gap-4 mb-12">
          <h1 className="instagram-logo text-5xl text-zinc-700 ">Instagram</h1>
        </div>
        <div>
          <div className="mb-4">
            <Input
              type="text"
              name="email"
              placeholder="Mobile Number or Email"
              className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4  border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 border border-gray-300"
            />
          </div>
        </div>
        <div>
          <Button className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600">
            Log in
          </Button>
        </div>
        <div className="flex items-center w-full my-5">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 font-semibold">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-blue-900 text-sm font-bold flex items-center gap-2">
          <span className="text-xl">   <FaFacebookSquare   /></span>
            Login in With Facebook
          </span>
          <span className="text-xs">Forgot Password?</span>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center border-2 w-full max-w-sm h-20">
        <Link to="/sign-up" className="  text-sm ">
          Don't have an account?{" "}
          <span className=" text-blue-500 hover:underline font-semibold">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}
