import React, { useState } from 'react'
import arrow from "/public/images/arrow.png"

const Faqs = () => {

    const [activeId, setActiveId] = useState(1)

    const faqs = [
        {
          id: 1,
          question: "What services are available on our website?",
          answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempore nam beatae adipisci aliquid nisi magnam voluptas corporis, illo atque error perspiciatis ea quod.",
        },
        {
          id: 2,
          question: "How can we guarantee the caliber of the assignments?",
          answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, unde. Tenetur quaerat est unde libero eaque molestias quae omnis quos saepe? Quam repudiandae perspiciatis placeat tempore itaque delectus rem repellendus distinctio, reiciendis vel perferendis reprehenderit maxime libero nulla odit neque.",
        },
        {
          id: 3,
          question:
            "What distinguishes our company from other assignment writing firms?",
          answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, cumque alias. Quis vel sunt a ex quia eligendi perspiciatis quam repudiandae in! Quod dignissimos assumenda tempore iste, delectus quaerat id!",
        },
        {
          id: 4,
          question: "Does utilizing our service have any limitations?",
          answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempore nam beatae adipisci aliquid nisi magnam voluptas corporis, illo atque error perspiciatis ea quod.",
        },
        {
          id: 5,
          question: "How can consumers access our website's news and updates?",
          answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempore nam beatae adipisci aliquid nisi magnam voluptas corporis, illo atque error perspiciatis ea quod.",
        },
      ];

    
  return (
    <div className='w-full h-max bg-gray-50 flex justify-center'>
        <div className='md:w-[70%] w-full h-full p-2 py-8'>
            <h2 className="font-sans font-bold md:text-4xl sm:text-3xl text-xl text-black">FAQs</h2>
            <div className='w-full h-max flex flex-col gap-2 items-center mt-5'>
            {faqs.map((item) => {
            return (
              <div key={item.id} className=" shadow-md cursor-pointer">
                <div className="w-full md:h-12 h-[100%] transition-all ease-linear duration-100 bg-white hover:bg-gray-100 flex flex-row justify-between items-center px-4" onClick={()=>setActiveId(activeId === item.id? null: item.id)}>
                  <span className="font-cormorant md:text-xl sm:text-lg text-sm text-black font-semibold ">
                    {item.question}
                  </span>
                  <div className="p-2 cursor-pointer transition-all ease-linear duration-200 hover:bg-gray-200 rounded-full flex justify-center items-center ">
                    <img src={arrow} alt="" className={`transition-all w-5 ease-in-out duration-500 ${activeId===item.id?'rotate-180': ''}`} />
                  </div>
                </div>

                <div className={`${activeId=== item.id?'h-max p-4 ' : 'h-0'} font-cormorant font-normal md:text-xl sm:text-lg text-sm text-black  transition-all ease-in-out duration-400 overflow-hidden w-full bg-white sm:border-l-8 border-l-4 border-l-blue-600 `}>
                  <p>
                  {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
            </div>
        </div>
    </div>
  )
}

export default Faqs

