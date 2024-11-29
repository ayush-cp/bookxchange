import React, { useEffect, useState } from "react";
import ham from "/public/images/ham.png";
import bookLogo from "/public/images/logo.png";
import { Link } from "react-router-dom";
import user from "/public/images/user.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, []);

  
  return (
    <div className="w-full h-max">
      <div className="relative w-full h-full p-4 bg-gray-300 bg-opacity-50 backdrop-blur-md flex flex-row justify-between px-8">
        <div className="sm:w-36 w-48 h-12 cursor-pointer ">
          <Link to="/">
            {" "}
            <img
              src={bookLogo}
              alt=""
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
        <div className=" md:w-[30%] md:min-w-[400px] w-full h-max flex md:flex-row md:px-0 px-6 justify-end items-center gap-8">
          <div
            onClick={() => setMenu(!menu)}
            className={` ${
              menu ? "bg-gray-200 bg-opacity-30" : "bg-transparent"
            } p-2 absolute right-2 top-3 cursor-pointer transition-all ease-linear duration-200 hover:bg-gray-300 rounded-lg md:hidden inline-block`}
          >
            <img src={ham} alt="menu" className="w-6 h-6" />
          </div>
          <ul
            className={`w-full ${
              menu ? "flex" : "hidden"
            } md:flex md:flex-row md:bg-transparent bg-gray-200 flex-col md:static absolute top-[100%] right-0 justify-between items-center md:gap-0 gap-3`}
          >
            <li className="text-gray-800 relative md:w-max w-full text-center  cursor-pointer font-sans text-lg font-semibold transition-all ease-linear duration-200 p-2 py-1 hover:bg-[#e8e7e7ca] rounded-[0.4rem] after:transition-all after:duration-300 hover:drop-shadow-[0px_1px_1px_#c8f2fd] after:ease-in after:content-[''] after:h-[2px] hover:after:w-full after:w-0 after:absolute after:bg-black after:bottom-0 after:left-0">
              <Link to="/">Home</Link>
            </li>
            <li className="text-gray-800 relative md:w-max w-full text-center  cursor-pointer font-sans text-lg font-semibold transition-all ease-linear duration-200 p-2 py-1 hover:bg-[#e8e7e7ca] rounded-[0.4rem] after:transition-all after:duration-300 hover:drop-shadow-[0px_1px_1px_#c8f2fd] after:ease-in after:content-[''] after:h-[2px] hover:after:w-full after:w-0 after:absolute after:bg-black after:bottom-0 after:left-0">
              <Link to="/booksearch">New Read</Link>
            </li>
            <li className="text-gray-800 relative md:w-max w-full text-center  cursor-pointer font-sans text-lg font-semibold transition-all ease-linear duration-200 p-2 py-1 hover:bg-[#e8e7e7ca] rounded-[0.4rem] after:transition-all after:duration-300 hover:drop-shadow-[0px_1px_1px_#c8f2fd] after:ease-in after:content-[''] after:h-[2px] hover:after:w-full after:w-0 after:absolute after:bg-black after:bottom-0 after:left-0">
              <Link to="/profile">Share Book</Link>
            </li>
          </ul>
          <div>
            {userLogged ? (
              <button className="bg-blue-500 transition-all ease-linear duration-200 hover:bg-[#4a42e6c4] px-4 py-1 rounded-md text-white text-lg font-semibold font-sans">
                <Link to="/profile">
                  <img src={user} alt="" className="w-10 "/>
                </Link>
              </button>
            ) : (
              <button className="bg-blue-500 transition-all ease-linear duration-200 hover:bg-[#4a42e6c4] px-4 py-1 rounded-md text-white text-lg font-semibold font-sans">
                <Link to="/bookexchangelogin">Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
