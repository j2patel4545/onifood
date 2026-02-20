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
        navigate("/admin");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen min-w-screen bg-gradient-to-r from-[#CB202D] to-[#EC0C92]">
      <form onSubmit={handleLogin} className="flex flex-col gap-10 justify-center">
<h2 className=" w-full flex justify-center text-3xl text-zinc-200 uppercase">Admin Login</h2>        <input
          className="flex h-14 w-86 bg-amber-50 rounded-md px-3 text-2xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="flex h-14 w-86 bg-amber-50 rounded-md px-3 text-2xl"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Mobile Number"
          type="text"
          required
        />
        <button type="submit" className="flex bg-black text-white h-14 w-86 rounded-md justify-center text-2xl items-center">
          Login
        </button>
      </form>
      <h3 className="flex gap-1 text-white">
        Don't have an account? <Link to="/reg" className="underline">Register</Link>
      </h3>
    </div>
  );
}

export default Login;
