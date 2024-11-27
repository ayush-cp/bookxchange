import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import Selector from "./Selector";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import axios from "axios";

const BookSearch = () => {
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [isbn, setIsbn] = useState("");

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [response, setResponse] = useState(null); // State to store backend response

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
        "http://backend-api-url.com/api/booksearch",
        payload
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
    <div className="sticky top-0 z-10"><Navbar />
    </div>
    <section className="min-h-screen grid place-items-center bg-[url('Book-lovely-hd-wallpaper.jpg')] bg-cover bg-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg md:p-4 rounded-xl w-[90%] md:w-[50%] h-[80%] bg-gradient-to-br from-teal-600 to-emerald-800 opacity-80"
      >
        <h2
          className="md:text-4xl text-3xl mt-5 mb-2 text-[#fcd34d] font-bold text-center"
          style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
        >
          Select Your Location and ISBN number of the Book
        </h2>
        <div className="flex flex-col gap-4 justify-center items-center">
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
              className="p-2 rounded-lg"
              type="text"
              onChange={handleIsbnChange}
              value={isbn}
            />
          </div>
          <button
            type="submit"
            className="w-[50%] md:w-[15%] bg-black text-white py-2 px-4 rounded-xl hover:bg-teal-600"
          >
            Submit
          </button>
        </div>

        {/* displaying content from the backend */}
        {response && JSON.stringify(response)}
      </form>
    </section>
    <Footer />
    </>
  );
};

export default BookSearch;
