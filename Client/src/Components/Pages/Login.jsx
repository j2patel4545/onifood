import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Food from "../../Context/Fcontext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCola } = useContext(Food);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple Validation before sending request
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8799/user/login", {
        email,
        password,
      });

      if (response.data.user) {
        setCola(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Welcome back to OniFood!");
        navigate("/das"); // Redirect to Dashboard/Home
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative overflow-hidden px-4">

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white p-10 z-10"
      >

        {/* Header Setup */}
        <div className="text-center mb-10">
          <div className="inline-flex justify-center items-center h-16 w-16 rounded-full bg-red-50 text-red-500 mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back 👋</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Enter your details to access your account.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              className="w-full h-14 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              required
            />
          </div>

          {/* Password Box */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-sm font-semibold text-red-600 hover:text-red-500 transition">Forgot Password?</a>
            </div>
            <input
              className="w-full h-14 px-5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-14 flex items-center justify-center rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-md ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Redirect */}
        <p className="text-center text-sm text-gray-600 mt-8 font-medium">
          Don’t have an account yet?{" "}
          <Link
            to="/reg"
            className="text-red-600 hover:text-red-700 font-bold hover:underline underline-offset-4 transition"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
