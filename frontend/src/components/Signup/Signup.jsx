import React, { useState, useEffect } from "react";
import axios from "axios";
import bookBack from "/public/images/bookBack.png";
import closeEye from "/public/images/closeEye.png";
import openEye from "/public/images/openEye.png";
import { Country, State } from "country-state-city";
import Selector from "../BookSearch/Selector";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (country) {
      setStateData(State.getStatesOfCountry(country.isoCode));
      setState(null);
    }
  }, [country]);

  const handleName = (e)=>{
    if (/\d|[^a-zA-Z0-9]/.test(e.target.value)) {
      toast.error('Name should not contain any number or special character.');
      return;
    }
    setName(e.target.value)
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup data:", name, email, password, country, state);
    if (!country || (stateData.length > 0 && !state)) {
      toast.error("Please select a country and state.");
      return;
    }
    try {
      if(!name || !email || !password || !country || !state) {
        toast.error('Please fill all the fields');
        return;
      }
     if (password.length<6 || !(/\d/).test(password) || !(/[^a-zA-Z0-9]/).test(password) || !(/[a-zA-Z]/).test(password)) {
      toast.error('Password should contain alphabets, numbers and special characters.');
        return;
     }
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password,
        country: country.name,
        state: state?.name || null,
      });
      toast.success("Signup successful!");
      const { token, user } = response.data;
      localStorage .setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/bookSearch");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error.response?.data?.error || "Signup failed");
    }
  };
  

  return (
    <div className="w-full min-h-screen h-max bg-emerald-100 bg-opacity-80 backdrop-blur-md flex justify-center items-center p-4">
      <ToastContainer/>
      <div className="relative md:w-[70%] w-full md:min-h-[85%] md:h-max  h-max bg-emerald-300  p-4 rounded-2xl md:pl-8">
        <div className="absolute right-0 top-[10%] md:w-1/2 md:min-w-[300px] z-[0]">
          <img
            src={bookBack}
            alt="book"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="z-10 relative md:w-[40%] md:min-w-[300px] w-full h-full bg-white bg-opacity-30 backdrop-blur-sm flex flex-col gap-8 items-center p-4 rounded-lg">
          <h1 className="font-sans font-bold text-4xl text-yellow-500">Register</h1>
          <form className="w-full h-full flex flex-col items-center gap-2" onSubmit={handleSignup}>
            <div className="w-full h-max flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-sans font-normal text-md text-gray-800"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleName}
                placeholder="Enter your name"
                className="p-2 px-4 font-sans font-normal text-md text-gray-500 rounded-lg outline-none bg-white"
                required
              />
            </div>
            <div className="w-full h-max flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-sans font-normal text-md text-gray-800"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 px-4 font-sans font-normal text-md text-gray-500 rounded-lg outline-none bg-white"
                required
              />
            </div>

            <div className="relative w-full h-max flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-sans font-normal text-md "
              >
                Password
              </label>
              <div className="w-full h-max flex flex-row justify-between items-center bg-white rounded-[4px] px-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-[90%] p-2 px-2 outline-none bg-white font-cormorant font-normal text-md text-gray-500"
                  required
                />
                <img
                  src={showPassword ? openEye : closeEye}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <p className="text-xs text-red-600" >Password should be atleast 6 characters with Numbers and Special Characters.</p>
            </div>

            <div className="w-full h-max flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-sans font-normal text-md text-gray-800"
              >
                Country:
              </label>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
                required
              />
            </div>

            {stateData.length > 0 && (
              <div className="w-full h-max flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="font-sans font-normal text-md text-gray-800"
                >
                  State:
                </label>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                  required
                />
              </div>
            )}

            <div className="w-full h-max flex justify-center mt-3">
              <button
                type="submit"
                className="w-1/2 py-2 bg-emerald-500 hover:bg-emerald-400 hover:border hover:border-emerald-600 transition-all ease-linear duration-200 rounded-lg font-sans font-bold text-xl text-gray-50 cursor-pointer "
              >
                
                Sign Up
              
              </button>
            </div>
          </form>
          <div>
            <h4 className="font-sans font-semibold md:text-md text-xs text-gray-700">
              Don't have an account{" "}
              <span className="text-blue-700">
                <Link to="/login">Create Account</Link>
              </span>{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
