import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import Food from "../../Context/Fcontext";

function Header() {
  const [open, setOpen] = useState(false);
  const { setCola, cola } = useContext(Food);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCola(null);
    navigate("/");
  };

  const navLinkStyle = (path) =>
    `relative flex items-center gap-2 transition duration-300 ${
      location.pathname === path
        ? "text-red-500"
        : "text-gray-700 hover:text-red-500"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="./logo.png" alt="Logo" className="h-9 drop-shadow-sm" />
            <span className="font-bold text-xl tracking-wide hidden sm:block">
              OniFood
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex relative w-1/3">
            <input
              type="search"
              placeholder="Search food, restaurants..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition shadow-sm"
            />
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">

            <Link to="/home" className={navLinkStyle("/home")}>
              <HiOutlineHome className="text-xl" />
              Home
            </Link>

            <Link to="/my" className={navLinkStyle("/my")}>
              <div className="relative flex items-center gap-2">
                <HiOutlineShoppingBag className="text-xl" />
                My Orders

                {/* Animated Badge */}
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full animate-pulse shadow">
                  {cola?.length || 0}
                </span>
              </div>
            </Link>

            <Link to="/p" className={navLinkStyle("/p")}>
              <HiOutlineUserCircle className="text-xl" />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
            >
              <HiOutlineArrowRightOnRectangle className="text-xl" />
              Logout
            </button>

          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setOpen(true)}
          >
            <HiOutlineBars3 />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-72 bg-white p-6 flex flex-col gap-8 shadow-2xl animate-slideIn">

            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Menu</span>
              <HiOutlineXMark
                className="text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <Link
              onClick={() => setOpen(false)}
              to="/home"
              className="flex items-center gap-3 text-lg hover:text-red-500 transition"
            >
              <HiOutlineHome /> Home
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/my"
              className="flex items-center gap-3 text-lg hover:text-red-500 transition"
            >
              <HiOutlineShoppingBag /> My Orders
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/p"
              className="flex items-center gap-3 text-lg hover:text-red-500 transition"
            >
              <HiOutlineUserCircle /> Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-lg text-red-500 hover:opacity-80 transition"
            >
              <HiOutlineArrowRightOnRectangle /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;