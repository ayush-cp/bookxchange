import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  Globe,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Country, State } from "country-state-city";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CombinedAuthForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    otp: "",
  });

  const [stage, setStage] = useState("login");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [country, setCountry] = useState(null);


  const navigate = useNavigate();

  setUser(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    if (country) {
      setStateData(State.getStatesOfCountry(country.isoCode));
    }
  }, [country]);

  useEffect(() => {
    let interval;
    if (isResendDisabled && stage === "verify-otp") {
      interval = setInterval(() => {
        setResendTimeout((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, stage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    if (/\d|[^a-zA-Z ]/.test(value)) {
      toast.error("Name should not contain numbers or special characters.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !country ||
      !formData.state
    ) {
      setLoading(false);
      toast.error("Please fill in all fields.");
      return;
    }
    if (
      formData.password.length < 6 ||
      !/\d/.test(formData.password) ||
      !/[^a-zA-Z0-9]/.test(formData.password) ||
      !/[a-zA-Z]/.test(formData.password)
    ) {
      toast.error(
        "Password should contain alphabets, numbers and special characters."
      );
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      console.log("Signup response:", response.data);
      toast.success("Signup successful!");
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User:", user);
      console.log("Token:", token);
      setLoading(false);
      const obtainedotp = JSON.stringify(response.data.otp);
      setGeneratedOTP(obtainedotp);
      console.log(`Generated OTP: ${obtainedotp}`);
      toast.success("OTP sent to your email!");
  
      setLoading(false);
      setStage("verify-otp");
      setIsResendDisabled(true);
       
      navigate("/bookSearch");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error.response?.data?.error || "Signup failed");
    }

  
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      setLoading(false);
      toast.error("Please enter your email and password.");
      return;
    }

   try {
    const response = await axios.post("http://localhost:5000/api/users/login", formData);
    const { token, user } = response.data;
  
      // Store token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login Success:", response.data);
      navigate("/bookSearch");
   } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
      setError("Invalid email or password");
   }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    console.log("OTP Verification:", formData.otp);

    if (formData.otp == generatedOTP) {
        try {
            const email = localStorage.getItem("email"); // Retrieve email
            if (!email) {
                toast.error("Email is missing in localStorage.");
                return;
            }

            const response = await axios.post(
                "http://localhost:5000/api/users/verifyEmail",
                { email } // Ensure email is wrapped in an object
            );

            console.log("Email Verified:", response.data);
            toast.success("Registration successful!");
        } catch (error) {
            console.error("Error verifying email:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Error verifying email. Please try again.");
        }
    } else {
        toast.error("Incorrect OTP. Please try again.");
    }
};


  const resendOTP = () => {
    setIsResendDisabled(true);
    setResendTimeout(30);
    setTimeout(() => {
      setIsResendDisabled(false);
    }, 30000);
    axios.post("http://localhost:5000/api/users/resendotp", { email: formData.email });
    

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setStage("login")}
            className={`w-1/2 py-2 text-center ${
              stage === "login"
                ? "border-b-2 border-teal-600 text-teal-700 font-semibold"
                : "text-gray-500 hover:text-teal-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setStage("register")}
            className={`w-1/2 py-2 text-center ${
              stage === "register" || stage === "verify-otp"
                ? "border-b-2 border-teal-600 text-teal-700 font-semibold"
                : "text-gray-500 hover:text-teal-600"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-teal-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? <RefreshCw className="animate-spin" /> : "Login"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {stage === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-teal-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <select
                name="country"
                value={formData.country}
                onChange={(e) => {
                  const selectedCountry = countryData.find(
                    (country) => country.isoCode === e.target.value
                  );
                  setCountry(selectedCountry);
                  handleInputChange(e);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              >
                <option value="">Select Country</option>
                {countryData.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              >
                <option value="">Select State</option>
                {stateData.map((state) => (
                  <option key={state.isoCode} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className={`w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? <RefreshCw className="animate-spin" /> : "Register"}
            </button>
          </form>
        )}

        {/* OTP Verification */}
        {stage === "verify-otp" && (
          <form onSubmit={handleOTPVerification} className="space-y-5">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={resendOTP}
              disabled={isResendDisabled}
              className="w-full mt-2 text-emerald-600 hover:text-emerald-800 transition duration-300 text-center"
            >
              {isResendDisabled
                ? "Resend OTP in ${resendTimeout}s"
                : "Resend OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CombinedAuthForm;
