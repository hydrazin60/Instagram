import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "http://localhost:4000/api/v1/users/login",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.sucess) {
  //       navigate("/");
  //       toast.success(res.data.message, {
  //         position: "bottom-right",
  //         duration: 3000,
  //         style: {
  //           border: "1px solid #4caf50",
  //           background: "#e8f5e9",
  //           color: "#4caf50",
  //         },
  //       });
  //     } else {
  //       toast.error(res.data.message, {
  //         position: "bottom-right",
  //         duration: 3000,
  //         style: {
  //           border: "1px solid #00ff00",
  //           background: "#DDEDDA",
  //           color: "#000000",
  //           fontSize: "16px",
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     console.log("signIn error", err);
  //     toast.error("An error occurred. Please try again.", {
  //       position: "bottom-right",
  //       duration: 3000,
  //       style: {
  //         border: "1px solid #f44336",
  //         background: "#ffebee",
  //         color: "#f44336",
  //       },
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message, {
          position: "bottom-right",
          duration: 3000,
          style: {
            border: "1px solid #4caf50",
            background: "#e8f5e9",
            color: "#4caf50",
          },
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
          duration: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#ffebee",
            color: "#f44336",
          },
        });
      }
    } catch (error) {
      console.error("SignIn error", error);
      toast.error(error.response?.data?.message, {
        position: "bottom-right",
        duration: 3000,
        style: {
          border: "1px solid #f44336",
          background: "#ffebee",
          color: "#f44336",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-4 m-8">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded px-8 pt-6 pb-8  bg-white border border-gray-300 max-w-sm w-full"
      >
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
              value={formData.email}
              required
              onChange={handelChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 border border-gray-300"
              value={formData.password}
              required
              onChange={handelChange}
            />
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </div>
        <div className="flex items-center w-full my-5">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 font-semibold">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-blue-900 text-sm font-bold flex items-center gap-2">
            <span className="text-xl">
              {" "}
              <FaFacebookSquare />
            </span>
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
