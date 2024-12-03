import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import Selector from "./Selector";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import axios from "axios";

const BookSearch = () => {
   
   if(!localStorage.getItem("token")){
    window.location.href = "/bookexchangelogin";
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
      // console.log("Response from backend:", response.data);
      console.log("Books:", response.data.books);
      console.log("Users:", response.data.users);
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
        {response && (
  <div className="text-white text-center w-full">
    <h2 className="text-2xl font-bold mt-5">Books</h2>
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {response.books.map((book, index) => {
        const user = response.users.find(user => user._id === book.user);
        return (
          <div
            key={index}
            className="bg-gray-800 md:w-[200%] p-6 rounded-lg shadow-lg text-left flex flex-col md:flex-row"
          >
            {/* Book Details */}
            <div className="w-full md:w-full px-4 py-2 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">Book Details</h3>
              <p className="text-sm">📚 <strong>Title:</strong> {book.title}</p>
              <p className="text-sm">✍️ <strong>Author:</strong> {book.author}</p>
              <p className="text-sm">📖 <strong>Genre:</strong> {book.genre}</p>
              <p className="text-sm">📘 <strong>ISBN:</strong> {book.isbn}</p>
              <p className="text-sm">🌍 <strong>Country:</strong> {book.country}</p>
              <p className="text-sm">📍 <strong>State:</strong> {book.state}</p>
              <p className="text-sm">✔️ <strong>Read Status:</strong> {book.readStatus}</p>
            </div>

            {/* User Details */}
            <div className="w-full md:w-full px-4 py-2 bg-gray-700 rounded-lg mt-4 md:mt-0 md:ml-4">
              <h3 className="text-lg font-semibold mb-2 text-green-400">User Details</h3>
              <p className="text-sm">👤 <strong>Name:</strong> {user?.name || "N/A"}</p>
              <p className="text-sm">✉️ <strong>Email:</strong> {user?.email || "N/A"}</p>
              <p className="text-sm">🌍 <strong>Country:</strong> {user?.country || "N/A"}</p>
              <p className="text-sm">📍 <strong>State:</strong> {user?.state || "N/A"}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}


      </form>
    </section>
    <Footer />
    </>
  );
};

export default BookSearch;
