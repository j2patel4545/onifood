import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineUserPlus, HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2';

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

    if (!email || !mobileNumber || !username || !address || !password) {
      toast.error("All fields are required for authorization.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8799/user/register", {
        email,
        mobileNumber,
        password,
        Address: address,
        Username: username,
        role: 'admin' // Force register as admin for this portal
      });
      toast.success("Admin account created successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-12">

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg mb-3 relative z-10">
              <HiOutlineUserPlus className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight relative z-10">Create Admin Account</h1>
            <p className="text-slate-400 text-sm mt-1 relative z-10 font-medium">Onboard new management staff</p>
          </div>

          <div className="p-10">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      className="w-full h-12 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Admin Name"
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Work Email</label>
                  <div className="relative">
                    <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      className="w-full h-12 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@onifood.com"
                      type="email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Secret Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      className="w-full h-12 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Contact Number</label>
                  <div className="relative">
                    <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      className="w-full h-12 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit number"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Postal Address</label>
                <div className="relative">
                  <HiOutlineMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full h-12 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 font-medium"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address"
                    type="text"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-14 mt-4 flex items-center justify-center rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl shadow-red-500/20 ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-slate-900 hover:shadow-slate-900/20 active:scale-[0.98]'
                  }`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Create Staff Account"
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 text-sm font-medium">
                Already have access? <Link to="/" className="text-red-500 font-bold hover:underline">Log in here</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;