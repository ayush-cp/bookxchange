
import React from "react";

const Goal = () => {
  return (
    <div className="w-full h-max bg-gray-50 flex justify-center py-8">
      <div className="md:w-[50%] w-full h-full p-4 flex flex-col items-center gap-6">
        <h2 className="text-center font-sans font-bold md:text-4xl sm:text-3xl text-2xl md:leading-[3.5rem] text-black">
          Our Goal at <span className="text-yellow-500">bookexchange</span>  is to make people love books by making books
          easier & cheaper to access.{" "}
        </h2>
        <div className="w-full flex flex-row gap-4 justify-center font-sans font-semibold md:text-xl sm:text-lg text-md text-black">
            <span> <span className="text-green-500">10k+ </span>Books Shared</span>
            <span> <span className="text-blue-500">100+ </span>Members</span>
        </div>
      </div>
    </div>
  );
};

export default Goal;