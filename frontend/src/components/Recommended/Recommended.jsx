import React, { useEffect, useState, useRef } from "react";
import location from "/public/images/location.png";
import rating from "/public/images/rating.png";
import book from "/public/images/book.png";

const Recommend = () => {
  const imageRef = useRef([]);
  const [visibleItem, setVisibleItem] = useState([false, false, false, false]);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementIndex = Number(entry.target.dataset.index);

        if (entry.isIntersecting) {
          setVisibleItem((prev) => {
            const added = [...prev];
            added[elementIndex] = true;
            console.log(elementIndex, added[elementIndex]);
            
            return added;
          });
          observer.unobserve(entry.target);
        }
      });
    }, options);

    imageRef.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (imageRef.current) {
        imageRef.current.forEach((ref) => {
          ref && observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <div
      id="recommend"
      className="w-full md:min-h-[50vh] md:h-max h-max bg-gray-50 flex justify-center  py-8"
    >
      <div className="md:w-11/12 w-full h-full p-4 flex flex-col items-center gap-4">
        <h2
          data-index={0}
          ref={(e) => imageRef.current[0] = e}
          className={`font-sans font-bold md:text-3xl transition-all ease-in duration-500 sm:texl-2xl text-xl text-black ${
            visibleItem[0] ? "opacity-100 blur-0" : "opacity-0 blur-lg"
          }`}
        >
          How We Recommend
        </h2>
        <div className="md:w-[50%] w-full h-full grid md:grid-cols-2 grid-cols-1 gap-1 place-items-center">
          <div
            data-index={1}
            ref={(e) => (imageRef.current[1] = e)}
            className={`relative transition-all ease-in duration-500 w-[100%] h-[25vh] border border-gray-400 bg-gradient-to-br from-blue-300 from-0% to-gray-50 to-30% rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              visibleItem[1] ? "opacity-100 blur-0 left-0" : "opacity-0 blur-lg left-[-50%]"
            }`}
          >
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-sans font-bold md:text-2xl sm:text-xl text-lg text-black">
                Location
              </h3>
              <img
                src={location}
                alt="Location"
                className="md:w-12 sm:w-8 w-6 md:h-12 sm:h-8 h-6"
              />
            </div>
            <p className="text-center font-sans font-normal text-md text-black">
              We recommend books based on your location to ensure faster
              delivery and a better user experience.
            </p>
          </div>

          <div
            data-index={2}
            ref={(e) => (imageRef.current[2] = e)}
            className={`relative  transition-all ease-in duration-500 w-[100%] h-[25vh] border border-gray-400 bg-gradient-to-br from-gray-50 from-70% to-emerald-300 to-100% rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              visibleItem[2] ? "opacity-100 blur-0 left-0" : "opacity-0 blur-lg left-1/2"
            }`}
          >
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-sans font-bold md:text-2xl sm:text-xl text-lg text-black">
                Book Number
              </h3>
              <img
                src={book}
                alt="Book Number"
                className="md:w-12 sm:w-8 w-6 md:h-12 sm:h-8 h-6"
              />
            </div>
            <p className="text-center font-sans font-normal md:text-md sm:text-sm text-xs text-black">
              We recommend books that are popular and have been borrowed
              frequently by users, ensuring the highest quality.
            </p>
          </div>
          <div
            style={{
              background:
                "linear-gradient(to bottom right, #93c5fd 0%, #F9FAFB 20%,  #F9FAFB 80%, #6ee7b7 100%)",
            }}
            data-index={3}
            ref={(e) => (imageRef.current[3] = e)}
            className={`relative  transition-all ease-in duration-500 w-[100%] h-[25vh] md:col-span-2 border border-gray-400 rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              visibleItem[3] ? "opacity-100 blur-0 top-0" : "opacity-0 blur-lg top-[40%]"
            }`}
          >
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-sans font-bold md:text-2xl sm:text-xl text-lg text-black">
                Rating
              </h3>
              <img
                src={rating}
                alt="Rating"
                className="md:w-12 sm:w-8 w-6 md:h-12 sm:h-8 h-6"
              />
            </div>
            <p className="text-center font-sans font-normal text-md text-black">
              Our recommendation system also considers ratings and reviews from
              other users to suggest the best books available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
