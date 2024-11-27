import React from "react";
import location from "/public/images/location.png";
import rating from "/public/images/rating.png";
import book from "/public/images/book.png";

const Recommend = () => {
  return (
    <div id="recommend" className="w-full md:min-h-[50vh] md:h-max h-max bg-gray-50 flex justify-center  py-8">
      <div className="md:w-11/12 w-full h-full p-4 flex flex-col items-center gap-4">
        <h2 className="font-sans font-bold md:text-3xl sm:texl-2xl text-xl text-black">
          How We Recommend
        </h2>
        <div className="md:w-[50%] w-full h-full grid md:grid-cols-2 grid-cols-1 gap-1 place-items-center">
          <div className="w-[100%] h-[25vh] border border-gray-400 bg-gradient-to-br from-blue-300 from-0% to-gray-50 to-30% rounded-lg p-2 flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-sans font-bold md:text-2xl sm:text-xl text-lg text-black">
                Location
              </h3>
              <img src={location} alt="" className="md:w-12 sm:w-8 w-6 md:h-12 sm:h-8 h-6" />
            </div>

            <p className="text-center font-sans font-normal text-md text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              nostrum voluptatum et dolor tenetur reiciendis, aliquam
              accusantium,
            </p>
          </div>

          <div className="w-[100%] h-[25vh] border border-gray-400 bg-gradient-to-br from-gray-50 from-70% to-emerald-300 to-100% rounded-lg p-2 flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-sans font-bold md:text-2xl sm:text-xl text-lg text-black">
                Book Number
              </h3>
              <img src={book} alt="" className="md:w-12 sm:w-8 w-6 md:h-12 sm:h-8 h-6" />
            </div>

            <p className="text-center font-sans font-normal md:text-md sm:text-sm text-xs text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              nostrum voluptatum et dolor tenetur reiciendis, aliquam
              accusantium,
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(to bottom right, #93c5fd 0%, #F9FAFB 20%,  #F9FAFB 80%, #6ee7b7 100%)",
            }}
            className="w-[100%] h-[25vh] md:col-span-2 border border-gray-400 rounded-lg p-2 flex flex-col justify-center items-center gap-2"
          >
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-sans font-bold md:text-2xl sm:text-xl text-lg text-black">
                Rating
              </h3>
              <img src={rating} alt="" className="md:w-12 sm:w-8 w-6 md:h-12 sm:h-8 h-6" />
            </div>

            <p className="text-center font-sans font-normal text-md text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              nostrum voluptatum et dolor tenetur reiciendis, aliquam
              accusantium,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;