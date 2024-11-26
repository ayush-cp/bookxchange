import React, { useState } from "react";
import bookBack from "/public/images/bookBack.png";
import closeEye from "/public/images/closeEye.png";
import openEye from "/public/images/openEye.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full h-screen bg-emerald-500 flex justify-center items-center">
      <div className="relative w-[80%] h-[80%] bg-blue-300 p-4">
        <div className="absolute right-0 top-[10%] w-1/2">
          <img
            src={bookBack}
            alt="book"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[35%] h-full bg-blue-100 flex flex-col items-center p-4">
          <h1 className="font-sans font-bold text-4xl text-yellow-500">
            Register
          </h1>
          <form className="w-full h-full flex flex-col items-center gap-2">
            <div className="w-full h-max flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-sans font-semibold text-xl text-gray-800"
              >
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 px-4 font-sans font-normal text-md text-gray-900 rounded-lg outline-none bg-white"
              />
            </div>
            <div className="w-full h-max flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-sans font-semibold text-xl text-gray-800"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 px-4 font-sans font-normal text-md text-gray-900 rounded-lg outline-none bg-white"
              />
            </div>

            <div className="relative w-full h-max flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-sans font-semibold text-xl "
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
                  className="p-2 px-2 outline-none bg-white font-cormorant font-normal text-md text-gray-900"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;



