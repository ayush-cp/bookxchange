import React, { useState } from "react";
import bookBack from "/public/images/bookBack.png";
import closeEye from "/public/images/closeEye.png";
import openEye from "/public/images/openEye.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full h-screen bg-emerald-100 bg-opacity-80 backdrop-blur-md flex justify-center items-center p-4">
      <div className="relative flex items-center md:w-[70%] w-full md:h-[80%] h-max bg-emerald-300  p-4 rounded-2xl md:pl-8">
        <div className="absolute right-0 top-[10%] md:w-1/2 md:min-w-[300px] z-[0]">
          <img
            src={bookBack}
            alt="book"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="z-10 relative md:w-[40%] md:min-w-[300px] w-full h-[80%] bg-white bg-opacity-30 backdrop-blur-sm flex flex-col gap-8 items-center justify-center p-4 py-16 rounded-lg">
          <h1 className="font-sans font-bold text-4xl text-yellow-500">
            Login
          </h1>
          <form className="w-full h-max flex flex-col items-center gap-2">
            <div className="w-full h-max flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-sans font-normal text-md text-gray-800"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 px-4 font-sans font-normal text-md text-gray-500 rounded-lg outline-none bg-white"
              />
            </div>

            <div className="relative w-full h-max flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-sans font-normal text-md "
              >
                Password
              </label>
              <div className="w-full h-max flex flex-row justify-between items-center bg-white rounded-[4px] px-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[90%] p-2 px-2 outline-none bg-white font-cormorant font-normal text-md text-gray-500"
                  required
                />
                <img
                  src={showPassword ? openEye : closeEye}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="w-full h-max flex justify-center mt-3">
              <button className="w-1/2 py-2 bg-emerald-500 hover:bg-emerald-400 hover:border hover:border-emerald-600 transition-all ease-linear duration-200 rounded-lg font-sans font-bold text-xl text-gray-50 cursor-pointer ">
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <h4 className="font-sans font-semibold md:text-md text-xs text-gray-700">
              Don't have an account{" "}
              <span className="text-blue-700">
                <Link to="/signup">Create Account</Link>
              </span>{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
