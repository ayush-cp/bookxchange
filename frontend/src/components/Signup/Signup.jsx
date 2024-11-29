import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Globe, LogIn, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Country, State } from "country-state-city";
import Selector from "../BookSearch/Selector";

const BookExchangeLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    otp: "",
  });
  const [stage, setStage] = useState("login"); // 'login', 'register', 'verify-otp'
  const [generatedOTP, setGeneratedOTP] = useState("");
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (country) {
      setStateData(State.getStatesOfCountry(country.isoCode));
      setState(null);
    }
  }, [country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleName = (e) => {
    const { value } = e.target;
    if (/\d|[^a-zA-Z0-9]/.test(value)) {
      toast.error("Name should not contain any number or special character.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.country
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Password validation: at least 6 characters, includes a number, special character, and alphabet
    if (
      formData.password.length < 6 ||
      !/\d/.test(formData.password) ||
      !/[^a-zA-Z0-9]/.test(formData.password) ||
      !/[a-zA-Z]/.test(formData.password)
    ) {
      toast.error(
        "Password should contain alphabets, numbers, and special characters."
      );
      return;
    }

    // Simulate OTP generation and sending
    const otp = generateOTP(); // Assuming you have a function to generate OTP
    setGeneratedOTP(otp); // Store the OTP for verification

    // Log the generated OTP for debugging purposes (you can remove it in production)
    console.log(`OTP generated: ${otp}`);

    // Change the stage to OTP verification
    setStage("verify-otp");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Basic login validation
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    // In a real app, you'd validate credentials here
    console.log("Login attempt:", formData.email);
    alert("Login functionality to be implemented");
  };

  const handleOTPVerification = (e) => {
    e.preventDefault();

    if (formData.otp === generatedOTP) {
      alert("Registration Successful!");
      console.log("User registered:", formData);
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-teal-100">
        <div className="p-10">
          {/* Navigation Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setStage("login")}
              className={`w-1/2 py-2 text-center transition duration-300 ${
                stage === "login"
                  ? "border-b-2 border-emerald-600 text-emerald-700 font-semibold"
                  : "text-gray-500 hover:text-emerald-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setStage("register")}
              className={`w-1/2 py-2 text-center transition duration-300 ${
                stage === "register" || stage === "verify-otp"
                  ? "border-b-2 border-emerald-600 text-emerald-700 font-semibold"
                  : "text-gray-500 hover:text-emerald-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {stage === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center justify-center shadow-lg"
              >
                <LogIn className="mr-2" /> Login
              </button>

              <div className="text-center mt-3">
                <a href="#" className="text-teal-600 hover:underline text-sm">
                  Forgot Password?
                </a>
              </div>
            </form>
          )}

          {/* Registration Form */}
          {stage === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleName}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              {/* Country Dropdown */}
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <Selector
                  data={countryData}
                  selected={country}
                  setSelected={setCountry}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              {/* State Dropdown */}
              {country && (
                <div className="relative mt-4">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                  <Selector
                    data={stateData}
                    selected={state}
                    setSelected={setState}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center justify-center shadow-lg"
              >
                Register
              </button>
            </form>
          )}

          {/* OTP Verification */}
          {stage === "verify-otp" && (
            <form onSubmit={handleOTPVerification} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center justify-center shadow-lg"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookExchangeLogin;
