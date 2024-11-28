import React, { useState } from "react";
import arrow from "/public/images/arrow.png";

const Faqs = () => {
  const [activeId, setActiveId] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "How does the book borrowing process work?",
      answer:
        "Users can browse available books, request to borrow a book, and coordinate pickup or delivery with the book owner.",
    },
    {
      id: 2,
      question: "Is there a limit to the number of books I can borrow?",
      answer:
        "There are no limits to the number of books you can borrow, but borrowing multiple books simultaneously may depend on availability and owner approval.",
    },
    {
      id: 3,
      question: "What happens if the book I want is unavailable?",
      answer:
        "You can add the book to your wishlist, and we will notify you when it becomes available.",
    },
    {
      id: 4,
      question: "How long can I borrow a book for?",
      answer:
        "The standard borrowing duration is 14 days, but extensions may be granted with the lender's approval.",
    },
    {
      id: 5,
      question: "What if the book is damaged or lost?",
      answer:
        "Borrowers are responsible for the book's condition. If a book is damaged or lost, you may be required to replace it or compensate the owner.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 flex justify-center">
      <div className="md:w-[70%] w-full h-full p-2 py-8">
        <h2 className="font-sans font-bold md:text-4xl sm:text-3xl text-xl text-black">
          FAQs
        </h2>
        <div className="w-full h-max flex flex-col gap-2 items-center mt-5">
          {faqs.map((item) => {
            return (
              <div key={item.id} className="w-full shadow-md cursor-pointer">
                <div
                  className="w-full md:h-12 h-[100%] transition-all ease-linear duration-100 bg-white hover:bg-gray-100 flex flex-row justify-between items-center px-4"
                  onClick={() =>
                    setActiveId(activeId === item.id ? null : item.id)
                  }
                >
                  <span className="font-cormorant md:text-xl sm:text-lg text-sm text-black font-semibold">
                    {item.question}
                  </span>
                  <div className="p-2 cursor-pointer transition-all ease-linear duration-200 hover:bg-gray-200 rounded-full flex justify-center items-center">
                    <img
                      src={arrow}
                      alt="arrow"
                      className={`transition-all w-5 ease-in-out duration-500 ${
                        activeId === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`${
                    activeId === item.id ? "h-max p-4 " : "h-0"
                  } font-cormorant font-normal md:text-xl sm:text-lg text-sm text-black transition-all ease-in-out duration-400 overflow-hidden w-full bg-white sm:border-l-8 border-l-4 border-l-blue-600`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
