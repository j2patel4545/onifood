import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Food from "../../Context/Fcontext";


function Login() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const { setCola } = useContext(Food);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8799/user/login", {
        email,
        mobileNumber,
      });
        console.log(response.data.student);
        
      if (response.data.student) {
        setCola(response.data.student);
        localStorage.setItem("user", JSON.stringify(response.data.student));
        alert("Login successful!");
        navigate("/home");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CB202D] to-[#EC0C92] px-4">
    
    {/* Card */}
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome Back 👋</h1>
        <p className="text-sm text-white/80 mt-2">
          Login to continue to your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm text-white mb-2">Email</label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-white/90 text-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-white 
                       transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm text-white mb-2">Mobile Number</label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-white/90 text-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-white 
                       transition duration-300"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            type="text"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-12 bg-black text-white rounded-lg 
                     hover:bg-gray-800 active:scale-95 
                     transition duration-300 font-semibold"
        >
          Login
        </button>
      </form>

      {/* Register */}
      <p className="text-center text-sm text-white mt-6">
        Don’t have an account?{" "}
        <Link
          to="/reg"
          className="underline hover:text-black transition"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
