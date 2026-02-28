import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function Register() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Form Validation 
    if (!email || !mobileNumber || !username || !address || !password) {
      toast.error("Please fill in all the required fields.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8799/user/register", {
        email,
        mobileNumber,
        password,
        Address: address,
        Username: username
      });
      toast.success("Account created successfully! Please login.");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative overflow-hidden px-4 py-10">

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white p-8 sm:p-10 z-10"
      >

        {/* Header Setup */}
        <div className="text-center mb-10">
          <div className="inline-flex justify-center items-center h-16 w-16 rounded-full bg-orange-50 text-orange-500 mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account ✨</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Join OniFood and start ordering today.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              className="w-full h-12 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. John Doe"
              type="text"
              required
            />
          </div>

          {/* Email Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              className="w-full h-12 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              required
            />
          </div>

          {/* Mobile Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <input
              className="w-full h-12 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your 10-digit number"
              type="text"
              required
            />
          </div>

          {/* Password Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              className="w-full h-12 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
          </div>

          {/* Address Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
            <input
              className="w-full h-12 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your street address"
              type="text"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-14 mt-4 flex items-center justify-center rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-md ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 hover:shadow-lg active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer Redirect */}
        <p className="text-center text-sm text-gray-600 mt-8 font-medium">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 font-bold hover:underline underline-offset-4 transition"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
