import React, { useState } from 'react';
import { Mail, Lock, User, Globe, LogIn } from 'lucide-react';

// Simulated country list
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 
  'India', 'Germany', 'France', 'Japan', 'Brazil', 'China'
];

const states = {
    'United States': ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
    'India': ['Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat', 'Andhra Pradesh', 'Odisha', 'Telangana', 'Kerala', 'Jharkhand', 'Assam', 'Punjab', 'Chhattisgarh', 'Haryana', 'Uttarakhand', 'Himachal Pradesh', 'Tripura', 'Meghalaya', 'Manipur', 'Nagaland', 'Goa', 'Arunachal Pradesh', 'Mizoram', 'Sikkim', 'Delhi', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar', 'Ladakh', 'Lakshadweep'],
    'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
    'France': ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Hauts-de-France', 'Occitanie', 'Provence-Alpes-Côte d\'Azur'],
    'Japan': ['Tokyo', 'Kanagawa', 'Osaka', 'Aichi', 'Hokkaido'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Bahia', 'Minas Gerais', 'Paraná'],
    'China': ['Guangdong', 'Shandong', 'Henan', 'Sichuan', 'Hunan']
};

const BookExchangeLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    otp: ''
  });
  const [stage, setStage] = useState('login'); // 'login', 'register', 'verify-otp'
  const [generatedOTP, setGeneratedOTP] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.country) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate OTP generation and sending
    const otp = generateOTP();
    setGeneratedOTP(otp);
    
    console.log(`OTP generated: ${otp}`);
    
    setStage('verify-otp');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Basic login validation
    if (!formData.email || !formData.password) {
      alert('Please enter email and password');
      return;
    }

    // In a real app, you'd validate credentials here
    console.log('Login attempt:', formData.email);
    alert('Login functionality to be implemented');
  };

  const handleOTPVerification = (e) => {
    e.preventDefault();
    
    if (formData.otp === generatedOTP) {
      alert('Registration Successful!');
      console.log('User registered:', formData);
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-emerald-100">
        <div className="p-8">
          {/* Navigation Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setStage('login')}
              className={`w-1/2 py-2 text-center transition duration-300 ${
                stage === 'login' 
                  ? 'border-b-2 border-emerald-600 text-emerald-700 font-semibold' 
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setStage('register')}
              className={`w-1/2 py-2 text-center transition duration-300 ${
                stage === 'register' || stage === 'verify-otp'
                  ? 'border-b-2 border-emerald-600 text-emerald-700 font-semibold' 
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {stage === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center justify-center"
              >
                <LogIn className="mr-2" /> Login
              </button>

              <div className="text-center">
                <a href="#" className="text-teal-600 hover:underline text-sm">
                  Forgot Password?
                </a>
              </div>
            </form>
          )}

          {/* Registration Form */}
          {stage === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <div>
                    {formData.country && (
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select State</option>
                            {states[formData.country].map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    )}
                    
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-300"
              >
                Continue
              </button>
            </form>
          )}

          {/* OTP Verification Form */}
          {stage === 'verify-otp' && (
            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600">
                  We've sent a 6-digit OTP to {formData.email}
                </p>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleInputChange}
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-300"
              >
                Verify OTP
              </button>

              <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={() => setStage('register')}
                  className="text-teal-600 hover:underline"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookExchangeLogin;
