import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Food from "../../Context/Fcontext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineLockClosed, HiOutlineEnvelope } from "react-icons/hi2";

function Login() {
  const [email, setEmail] = useState("s@gmail.com");
  const [password, setPassword] = useState("123");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCola } = useContext(Food);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Fixed credentials check
    if (email === "s@gmail.com" && password === "123") {
      // Mock successful admin login
      const mockAdmin = {
        id: "admin-fixed",
        Username: "System Admin",
        email: "s@gmail.com",
        role: "admin"
      };
      setCola(mockAdmin);
      localStorage.setItem("user", JSON.stringify(mockAdmin));
      localStorage.setItem("token", "fixed-admin-token");
      toast.success("Authorized as System Admin");
      navigate("/admin");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8799/user/login", {
        email,
        password,
      });

      // We check if it's a valid user and ideally we'd check if they have 'admin' role
      if (response.data.user) {
        // If you want to restrict login to admins only on this portal:
        if (response.data.user.role !== 'admin') {
          toast.error("Access Denied: Admin privileges required.");
          setIsLoading(false);
          return;
        }

        setCola(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Consistent key with client
        localStorage.setItem("token", response.data.token);

        toast.success("Welcome, Admin!");
        navigate("/admin");
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

          <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-2xl"></div>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg mb-4 relative z-10">
              <HiOutlineLockClosed className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight relative z-10">Admin Control</h1>
            <p className="text-slate-400 text-sm mt-1 relative z-10 font-medium">Secure Access Portal</p>
          </div>

          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full h-14 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@onifood.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Secret Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full h-14 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                    // value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-14 flex items-center justify-center rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl shadow-red-500/20 ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-slate-900 hover:shadow-slate-900/20 active:scale-[0.98]'
                  }`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Authorize Access"
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 text-sm font-medium">
                Restricted Area. <Link to="/" className="text-red-500 font-bold hover:underline">Employee Portal</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
