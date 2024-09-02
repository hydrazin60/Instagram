import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import LeftSidbar from "./components/LeftSidbar";
import Home from "./components/Home";
import RightSidbar from "./components/RightSidbar";
import Profile from "./components/Profile";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-between   ">
              <LeftSidbar />
              <Home />
              <RightSidbar />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="flex   ">
              <LeftSidbar />
              <Profile />
            </div>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
