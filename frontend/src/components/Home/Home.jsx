import React, { useEffect, useRef, useState } from "react";
import hero from "/public/images/hero.png";
import Navbar from "../Layout/Navbar";
import Review from "../Review/Review";
import Goal from "../Goal/Goal";
import Recommend from "../Recommended/Recommended";
import Faqs from "../Faq/Faq";
import Footer from "../Layout/Footer";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
 
  const imageRef = [useRef(null), useRef(null), useRef(null)];
  const [visibleItem, setVisibleItem] = useState(
    new Array(imageRef.length).fill(false)
  );
  useEffect(() => {
   
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }
    const observer = new IntersectionObserver((entries) => {
      const intersectingElements = [...visibleItem]
      entries.forEach((entry, index)=>{
        const elementIndex = imageRef.findIndex(ref=>ref.current===entry.target)
        if(elementIndex !== -1 && entry.isIntersecting){
          intersectingElements[elementIndex] = true
          console.log(elementIndex, intersectingElements[elementIndex]);
          observer.unobserve(entry.target)
        }
      })
      setVisibleItem(intersectingElements)
    }, options)

    imageRef.forEach((ref)=>{
      if (ref.current) {
        observer.observe(ref.current)
      }
    })


    return () => {
      
      imageRef.forEach((ref)=>{
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    };
  }, []);

  // const navigate=useNavigate();
  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      <div className="transition-all ease-linear duration-500 fixed w-full z-10 h-max">
        <Navbar />
      </div>
      <div
        id="home"
        className="relative w-full md:h-[90vh] h-[80vh] bg-gradient-to-br from-gray-50 from-60% via-blue-50 to-cyan-50 to-50% flex justify-center items-center z-0 overflow-hidden"
      >
        <div
          ref={imageRef[0]}
          className={`transition-all ease-linear duration-500 z-0 md:w-[50%] w-[60%] md:h-[75%] h-[80%] absolute bottom-[5%] ${
            visibleItem[0] ? "right-[-5%] opacity-100" : "right-[-10%] opacity-0"
          }`}
        >
          <img
            src={hero}
            alt="hero image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="z-10 md:w-1/2 w-full h-max flex flex-col items-center gap-4">
          <h1 ref={imageRef[1]} className={`${visibleItem[1]?'scale-100 opacity-100':'scale-60 opacity-0'} flex transition-all ease-linear duration-500 flex-col gap-4 md:text-5xl sm:text-3xl text-2xl font-semibold text-gray-800`}>
            <span>Share Knowledge</span>{" "}
            <span className="text-emerald-700 ml-20">Increase Knowledge</span>
          </h1>
          <div className="flex flex-row gap-4">
            <button className="bg-blue-400 hover:bg-blue-500 transition-all ease-out duration-300 md:px-4 sm:px-2 px-2 py-1 rounded-lg md:text-2xl sm:text-xl text-md font-semibold text-gray-50">
              <Link to="/bookSearch">New Read</Link>
            </button>
            <button className="bg-green-400 hover:bg-green-500 transition-all ease-out duration-300 md:px-4 sm:px-2 px-2 py-1 rounded-lg md:text-2xl sm:text-xl text-md font-semibold text-gray-50">
              <Link to="/profile">Share Book</Link>
            </button>
          </div>

          <h3 className="md:text-xl sm:text-lg text-md font-semibold text-black">
            <span className="text-green-500"> 10.5K+ </span>Books Exchanged
          </h3>
        </div>
      </div>

      <div id="review" className="w-full h-max ">
        <Review />
      </div>
      <div className="w-full h-max ">
        <Goal />
      </div>
      <div className="w-full h-max">
        <Recommend />
      </div>
      <div id="faqs" className="w-full h-max">
        <Faqs />
      </div>
      <div className="w-full h-max">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
