import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const FormsignUphendler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (formData.password !== formData.confirmPassword) {
  //       seterror(true);
  //       setTimeout(() => {
  //         seterror(false);
  //       }, 3000);
  //       toast.error("Passwords do not match", {
  //         position: "bottom-right",
  //         duration: 3000,
  //         style: {
  //           border: "1px solid #f44336",
  //           background: "#ffebee",
  //           color: "#f44336",
  //         },
  //       });
  //       return;
  //     }
  //     seterror(false);
  //     const res = await axios.post(
  //       "http://localhost:4000/api/v1/users/register",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     if (res.data.success) {
  //       toast.success(res.data.message , {
  //         position: "bottom-right",
  //         duration: 3000,
  //         style: {
  //           border: "1px solid #4caf50",
  //           background: "#e8f5e9",
  //           color: "#4caf50",
  //         },
  //       });
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Profile fetch error:", error);
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   }
  // };

  const FormsignUphendler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 3000);
      toast.error("Passwords do not match", {
        position: "bottom-right",
        duration: 3000,
        style: {
          border: "1px solid #f44336",
          background: "#ffebee",
          color: "#f44336",
        },
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
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
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
        {
          position: "bottom-right",
          duration: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#ffebee",
            color: "#f44336",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-8 m-8">
      <form
        onSubmit={FormsignUphendler}
        className="shadow-md rounded px-8 pt-6 pb-8 bg-white border border-gray-300 max-w-sm w-full"
      >
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
            value={formData.email}
            placeholder="Mobile Number or Email"
            className="focus-visible:ring-2 focus-visible:ring-blue-500 bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
            required
            aria-label="Mobile Number or Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            className="focus-visible:ring-2 focus-visible:ring-blue-500 bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
            required
            aria-label="Full Name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
            required
            aria-label="Username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
            required
            aria-label="Password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            className="focus-visible:ring-transparent bg-slate-100 w-full py-2 px-4 rounded-lg border border-gray-300"
            required
            aria-label="Confirm Password"
            onChange={handleChange}
          />
          {error && (
            <p className="text-red-500 text-xs mt-2">
              Passwords do not match!! try again
            </p>
          )}
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
          <Button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign up
          </Button>
        </div>
      </form>
      <div className="border-2 w-full max-w-sm  h-20 mb-6 flex items-center justify-center  ">
        <p className="text-sm ">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-500 hover:underline font-semibold"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
