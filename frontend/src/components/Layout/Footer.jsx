import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const backRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { //animating gradient
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (backRef.current) {
      observer.observe(backRef.current);
    }

    return () => {
      if (backRef.current) {
        observer.unobserve(backRef.current);
      }
    };
  }, []);

  return (
    <div
      
      className="relative w-full md:h-[40vh] h-max transition-all ease-in duration-200 flex justify-center items-center"
    >
      <div ref={backRef} className={`z-0 absolute w-full ${visible?'h-full blur-0':'h-0 blur-lg'} bottom-0 left-0 blur-lg transition-all ease-in-out duration-500 bg-gradient-to-b from-gray-50 from-50% to-blue-400`}></div>
      <div className="relative z-10 w-[90%] h-[90%] flex md:flex-row flex-col justify-between items-center">
        <div className="md:w-[30%] w-full h-max flex flex-col items-center gap-2">
          <h3 className="font-sans font-semibold md:text-xl sm:text-lg text-lg text-black">
            Book Exchange
          </h3>
          <p className="font-sans font-normal md:text-md text-sm text-black text-justify">
            Thank you for visiting our website! We are committed to delivering
            the best products and services to our customers. Your satisfaction
            is our top priority, and we value your feedback. Explore our wide
            range of offerings and stay connected with us for updates,
            promotions, and more.
          </p>
          <button className="md:p-2 p-1 md:px-6 px-4 bg-blue-700 rounded-lg font-sans font-semibold md:text-xl sm:text-lg text-md text-white">
            <Link to="/signup">Register</Link>
          </button>
        </div>
        <div className="md:w-[20%] w-full h-max flex flex-row items-center justify-between md:mx-4 mx-8">
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-semibold text-xl text-black">
              Links
            </h4>
            <ul className="flex flex-col font-sans font-normal text-md text-black">
              <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">
                <a href="#home">Home</a>{" "}
              </li>
              <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">
                <Link to="/bookSearch">Get Book</Link>
              </li>
              <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">
                <Link to="/profile">Share Book</Link>
              </li>
            </ul>
          </div>
          <div className="w-max flex flex-col p-4 gap-4">
            <h4 className="font-sans font-semibold text-xl text-black">Info</h4>
            <ul className="w-max h-max flex flex-col font-sans font-normal text-md text-black">
              <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">
                <a href="#faqs">Faqs</a>{" "}
              </li>
              <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">
                <a href="#recommend">Recommend</a>{" "}
              </li>
              <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">
                <a href="#review">Reviews</a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
