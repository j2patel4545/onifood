import React, { useState } from 'react'
import axios  from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { HiCloudDownload } from 'react-icons/hi';


function Register() {
  const [email,Setemail]=useState("");
  const [mobileNumber,SetmobileNumber]=useState("");
  const [Username,SetUsername]=useState("");
  const [Address,Setaddress]=useState("");
  
  const Navigate= useNavigate();
  console.log(email,mobileNumber);
  const abc=async(e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8799/user/register",{email,mobileNumber,Address,Username})
      alert("succes");
      Navigate('/');
      
    } catch (error) {
      alert("failed");
      Navigate('/reg')
    }
  }
  
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CB202D] to-[#EC0C92] px-4">

    {/* Card */}
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Create Account ✨</h1>
        <p className="text-sm text-white/80 mt-2">
          Join us and start your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={abc} className="space-y-5">

        {/* Username */}
        <div>
          <label className="block text-sm text-white mb-2">Username</label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-white/90 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-white
                       transition duration-300"
            value={Username}
            onChange={(e) => SetUsername(e.target.value)}
            placeholder="Enter your username"
            type="text"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-white mb-2">Email</label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-white/90 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-white
                       transition duration-300"
            value={email}
            onChange={(e) => Setemail(e.target.value)}
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
            onChange={(e) => SetmobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            type="text"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-white mb-2">Address</label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-white/90 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-white
                       transition duration-300"
            value={Address}
            onChange={(e) => Setaddress(e.target.value)}
            placeholder="Enter your address"
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
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-white mt-6">
        Already have an account?{" "}
        <Link
          to="/"
          className="underline hover:text-black transition"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
}

export default Register