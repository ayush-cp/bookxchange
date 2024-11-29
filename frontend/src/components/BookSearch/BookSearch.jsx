import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import Selector from "./Selector";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import axios from "axios";

const BookSearch = () => {
   
   if(!localStorage.getItem("token")){
    window.location.href = "/login";
  }


   
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [isbn, setIsbn] = useState("");

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [response, setResponse] = useState(null); 

  const token = localStorage.getItem("token");

  

  useEffect(() => {
    if (country) {
      setStateData(State.getStatesOfCountry(country.isoCode));
      setState(null);
      setCity(null);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setCityData(City.getCitiesOfState(state.countryCode, state.isoCode));
      setCity(null);
    }
  }, [state]);

  const handleIsbnChange = (e) => {
    setIsbn(e.target.value);
  };

  {
    /* backend part */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      country: country?.name?.toLowerCase(),
      state: state?.name?.toLowerCase(),
      city: city?.name?.toLowerCase(),
      isbn: isbn,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/books/search",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error while sending data to backend:", error);
      setResponse(null);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <>
    <div className="fixed w-full z-20"><Navbar />
    </div>
    <section className=" py-24 min-h-screen h-max flex flex-col justify-center items-center gap-8 bg-gradient-to-br from-slate-400 to-gray-600">
         <div className="absolute w-full h-full bg-[url('backSearch.jpg')] top-0 left-0 opacity-60 rounded-xl blur-sm bg-fill bg-center z-0">

</div>
      <form
        onSubmit={handleSubmit}
        className="relative shadow-lg md:p-4 rounded-xl w-[90%] md:w-[50%] min-h-[80%] h-max py-4 bg-gray-50 bg-opacity-30  backdrop-blur-lg z-10"
      >
        
        <h2
          className="relative z-10 md:text-4xl sm:text-3xl text-xl mt-5 mb-2 text-[#ffffff] font-bold text-center"
          style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
        >
          Select Your Location and ISBN number of the Book
        </h2>
        <div className="relative flex flex-col gap-4 justify-center items-center z-10">
          <div className="flex md:flex-row flex-col justify-center align-center gap-3">
            <div>
              <label
                className="block text-white font-medium"
                style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
              >
                Country:
              </label>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            {stateData.length > 0 && (
              <div>
                <label
                  className="block text-white font-medium"
                  style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
                >
                  State:
                </label>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {cityData.length > 0 && (
              <div>
                <label
                  className="block text-white font-medium"
                  style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
                >
                  City:
                </label>
                <Selector
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>
          <div>
            <label
              className="block text-white font-medium"
              style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
            >
              Enter ISBN Number:
            </label>
            <input
              className="p-2 rounded-lg outline-none"
              type="text"
              onChange={handleIsbnChange}
              value={isbn}
            />
          </div>
          <button
            type="submit"
            className="sm:w-[30%] w-1/2 md:w-[15%] bg-black transition-all ease-out duration-150 text-white py-2 px-4 rounded-xl hover:bg-teal-600"
          >
            Submit
          </button>
        </div>

        {/* displaying content from the backend */}
        
      </form>
     
      {response && 
          <div className="relative z-10 sm:w-[70%] w-[90%] h-max bg-gray-50 bg-opacity-30 rounded-lg overflow-hidden  backdrop-blur-lg text-gray-800 text-center">
            <h2 className="text-2xl font-bold mt-5 text-white" style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}>Books</h2>
            <div className=" grid sm:grid-cols-2 grid-cols-1 gap-4  bg-gray-50 bg-opacity-30  backdrop-blur-lg p-4">
              {response.map((book, index) => (
                <div key={index} className="bg-gray-50 border border-gray-300 bg-opacity-95 p-4 flex flex-col gap-2 rounded-lg sm:w-[30vw] w-full h-max">
                    <div className="w-full h-max flex flex-row justify-between items-center">
                      <h2 className="sm:text-lg text-md font-bold">{book.title}</h2>
                      <h3 className="sm:text-lg text-md font-bold">{book.isbn}</h3>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-max h-max">
                      <h4 className="sm:text-md text-sm font-normal">{book.author}</h4>
                      <div className="w-max h-max flex flex-row gap-2 items-center">
                        <div className="p-2 py-1 cursor-pointer bg-emerald-300 rounded-md">
                          <h5 className="text-xs font-normal text-emerald-900">{book.genre}</h5>
                        </div>
                        <div className="p-2 py-1 cursor-pointer bg-emerald-300 rounded-md">
                          <h5 className="text-xs font-normal text-emerald-900">{book.readStatus}</h5>
                        </div>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        }
    </section>
    <Footer />
    </>
  );
};

export default BookSearch;
