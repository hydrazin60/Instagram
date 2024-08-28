import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="flex justify-center flex-col items-center gap-8 m-8">
      <form className="shadow-md rounded px-8 pt-6 pb-8 bg-white border border-gray-300 max-w-sm w-full">
        <div className="my-4 flex flex-col items-center gap-4">
          <h1 className="instagram-logo text-5xl text-zinc-700">Instagram</h1>
          <p className="text-slate-500 text-center font-semibold text-sm">
            Sign up to see photos and videos
            <br /> from your friends.
          </p>
          <Button className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600">
            Log in with Facebook
          </Button>
          <div className="flex items-center w-full mt-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500 font-semibold">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
        </div>

        <div className="mb-4">
          <Input
            type="text"
            name="email"
            placeholder="Mobile Number or Email"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-4 mb-4">
          <p className="text-xs text-gray-500">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn More
            </a>
          </p>
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms
            </a>
            ,{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Cookies Policy
            </a>
            .
          </p>
          <Button className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600">
            Sign up
          </Button>
        </div>
      </form>
      <div className="border-2 w-full max-w-sm  h-20 mb-6 flex items-center justify-center  ">
        <p className="text-sm ">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
