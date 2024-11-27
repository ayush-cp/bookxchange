import React from "react";
import user from "/public/images/user.png";
import emptyStar from "/public/images/emptyStar.png";
import yellowStar from "/public/images/yellowStar.png";
import { FaBook } from "react-icons/fa6";

const Review = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      rating: 3,
      review:
        "The service was good, but there is still room for improvement. The support team was responsive, but the delivery time could be faster. Overall, I am satisfied, but I hope to see improvements in the future.",
      image: user,
      bookImage: user,
      bookName: "The Merchant of Venice",
      date: "01/02/2056",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      review:
        "I am extremely happy with the service. From order placement to delivery, everything was seamless. The team was professional, and the customer support was outstanding. Highly recommend to anyone looking for a hassle-free experience.",
      image: user,
      bookImage: user,
      bookName: "Harry Potter",
      date: "12/11/2056",
    },
  ];

  return (
    <div className="w-full min-h-[50vh] bg-gray-50 h-max flex justify-center items-center py-4">
      <div className="md:w-[80%] w-full h-full p-4 flex flex-col items-center gap-5">
        <div className="w-full h-max flex flex-col items-center gap-4">
          <h2 className="font-sans font-bold md:text-3xl sm:text-2xl text-xl text-blue-900">
            Tried and Tested
          </h2>
          <p className="font-sans font-normal md:text-xl sm:text-md text-sm text-gray-800 text-center text-balance">
            See what our users have to say about our products. Real reviews from
            real customers.
          </p>
        </div>

        <div className="w-full h-max flex flex-col items-center gap-4 md:pl-8 pl-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-2 md:w-[60%] w-full md:min-h-[25vh] md:h-max min-h-[20vh] h-max bg-gray-50 shadow-md rounded-lg border border-gray-400"
            >
              <div className="w-full h-max flex flex-row justify-between p-1">
                <div className="w-[40%] p-1 flex flex-row items-start gap-3">
                  <div className="p-2 rounded-full border border-gray-500 bg-gray-800">
                    <img src={item.image} alt="" className="md:w-6 w-3" />
                  </div>
                  <div className="flex flex-col gap-[0.1rem]">
                    <h3 className="font-sans font-semibold md:text-lg sm:text-md text-sm text-gray-900">
                      {item.name}
                    </h3>
                    <p className="font-sans font-normal md:text-sm sm:text-xs text-[0.6rem] text-gray-900">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="md:w-[30%] w-[50%] h-max flex flex-row gap-2 items-center p-2">
                  <div className="text-[3vh]">
                    <FaBook />
                  </div>
                  <div>
                    <h3 className="font-sans font-normal md:text-md text-xs text-gray-900">
                      {item.bookName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="w-full h-max p-2">
                <p className="font-sans font-normal md:text-md sm:text-sm text-gray-900">
                  {item.review}
                </p>
              </div>
              <div className="w-full px-3">
                <div className="flex flex-row md:gap-1 gap-0">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <img
                      key={index}
                      src={yellowStar}
                      alt="Star"
                      className="md:w-5 w-3 md:h-5 h-3"
                    />
                  ))}
                  {Array.from({ length: 5 - item.rating }).map((_, index) => (
                    <img
                      key={index}
                      src={emptyStar}
                      alt="Star"
                      className="md:w-5 w-3 md:h-5 h-3"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
