import React from "react";

const Footer = () => {
  return (
    <div className="w-full md:h-[40vh] h-max bg-gradient-to-b from-gray-50 from-50% to-blue-400 flex justify-center items-center">
      <div className=" w-[90%] h-[90%] flex md:flex-row flex-col justify-between items-center">
        <div className="md:w-[30%] w-full h-max flex flex-col items-center gap-2">
          <h3 className="font-sans font-semibold md:text-xl sm:text-lg text-lg text-black">Book Exchange</h3>
          <p className="font-sans font-normal md:text-md text-sm text-black text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            in laborum voluptatibus eum id quas vitae numquam quidem ut
            doloribus!
          </p>
          <button className="md:p-2 p-1 md:px-6 px-4 bg-blue-700 rounded-lg font-sans font-semibold md:text-xl sm:text-lg text-md text-white">Register</button>
        </div>
        <div className="md:w-[20%] w-full h-max flex flex-row items-center justify-between md:mx-4 mx-8">
            <div className="flex flex-col gap-4">
                <h4 className="font-sans font-semibold text-xl text-black">Links</h4>
                <ul className="flex flex-col font-sans font-normal text-md text-black">
                    <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">Home</li>
                    <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">Get Book</li>
                    <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">Share Book</li>
                </ul>
            </div>
            <div className="w-max flex flex-col p-4 gap-4">
                <h4 className="font-sans font-semibold text-xl text-black">Info</h4>
                <ul className="w-max h-max flex flex-col font-sans font-normal text-md text-black">
                    <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">Faqs</li>
                    <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">Recommend</li>
                    <li className="cursor-pointer transition-all ease-linear duration-150 hover:text-gray-800 hover:font-bold">Reviews</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;