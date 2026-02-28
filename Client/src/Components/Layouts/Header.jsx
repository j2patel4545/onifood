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
  HiOutlineBookOpen,
  HiOutlineInformationCircle,
  HiOutlineEnvelopeOpen
} from "react-icons/hi2";
import Food from "../../Context/Fcontext";

function Header() {
  const [open, setOpen] = useState(false);
  const { setCola, cola, shoppy } = useContext(Food);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCola(null);
    navigate("/");
  };

  const navLinkStyle = (path) =>
    `relative flex items-center gap-1.5 transition duration-300 font-semibold ${location.pathname === path
      ? "text-red-500"
      : "text-gray-700 hover:text-red-500"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/das')}>
            <div className="flex items-center justify-center object-contain">
              <img src="./logo.png" className="object-contain h-12" alt="" />
            </div>
            <span className="font-black text-2xl tracking-wide hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              OniFood
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/das" className={navLinkStyle("/das")}>
              Home
            </Link>
            <Link to="/menu" className={navLinkStyle("/menu")}>
              Menu
            </Link>
            <Link to="/about" className={navLinkStyle("/about")}>
              About Us
            </Link>
            <Link to="/contact" className={navLinkStyle("/contact")}>
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/my" className={`relative p-2 rounded-full transition duration-300 ${location.pathname === '/my' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-100 hover:text-red-500'}`}>
              <HiOutlineShoppingBag className="text-2xl" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {shoppy?.length || 0}
              </span>
            </Link>

            <Link to="/p" className={`p-2 rounded-full transition duration-300 ${location.pathname === '/p' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-100'}`}>
              <HiOutlineUserCircle className="text-2xl" />
            </Link>

            <div className="w-px h-6 bg-gray-200 mx-1"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95"
            >
              <HiOutlineArrowRightOnRectangle className="text-xl" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 bg-gray-100 rounded-lg hover:text-red-500"
            onClick={() => setOpen(true)}
          >
            <HiOutlineBars3 className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">

            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <span className="font-black text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                OniFood
              </span>
              <button onClick={() => setOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-red-500">
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <Link onClick={() => setOpen(false)} to="/das" className="flex items-center gap-4 text-gray-700 font-semibold text-lg hover:text-red-500 transition">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><HiOutlineHome /></div> Home
              </Link>
              <Link onClick={() => setOpen(false)} to="/menu" className="flex items-center gap-4 text-gray-700 font-semibold text-lg hover:text-red-500 transition">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><HiOutlineBookOpen /></div> Menu
              </Link>
              <Link onClick={() => setOpen(false)} to="/about" className="flex items-center gap-4 text-gray-700 font-semibold text-lg hover:text-red-500 transition">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><HiOutlineInformationCircle /></div> About Us
              </Link>
              <Link onClick={() => setOpen(false)} to="/contact" className="flex items-center gap-4 text-gray-700 font-semibold text-lg hover:text-red-500 transition">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><HiOutlineEnvelopeOpen /></div> Contact
              </Link>
              <Link onClick={() => setOpen(false)} to="/my" className="flex items-center gap-4 text-gray-700 font-semibold text-lg hover:text-red-500 transition">
                <div className="relative p-3 bg-gray-50 rounded-xl text-gray-400">
                  <HiOutlineShoppingBag />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{shoppy?.length || 0}</span>
                </div>
                My Orders
              </Link>
              <Link onClick={() => setOpen(false)} to="/p" className="flex items-center gap-4 text-gray-700 font-semibold text-lg hover:text-red-500 transition">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><HiOutlineUserCircle /></div> Profile
              </Link>
            </div>

            <div className="absolute bottom-0 w-full p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition"
              >
                <HiOutlineArrowRightOnRectangle className="text-xl" /> Sign Out
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

export default Header;