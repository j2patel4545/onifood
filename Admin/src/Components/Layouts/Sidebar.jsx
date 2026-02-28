import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Food from "../../Context/Fcontext";
import {
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineUsers,
    HiOutlineChartPie,
    HiOutlineCog6Tooth,
    HiOutlineArrowRightOnRectangle,
    HiBars3,
    HiXMark
} from 'react-icons/hi2';

function Sidebar({ isOpen, toggleSidebar }) {
    const { setCola } = useContext(Food);
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <HiOutlineHome /> },
        { name: 'Orders', path: '/admin/orders', icon: <HiOutlineShoppingBag /> },
        { name: 'Products', path: '/admin/products', icon: <HiOutlineChartPie /> },
        { name: 'Users', path: '/admin/users', icon: <HiOutlineUsers /> },
        { name: 'Settings', path: '/admin/settings', icon: <HiOutlineCog6Tooth /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCola(null);
        window.location.href = '/';
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:w-72 shadow-2xl`}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center object-contain">
                            <img src="./logo.png" className="object-contain h-12" alt="" />
                        </div>
                        <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                            OniFood
                        </span>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
                        <HiXMark className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }
              `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`text-xl transition-transform ${isActive ? 'scale-110 text-red-500' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Profile / Logout */}
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="w-10 h-10 rounded-full border-2 border-slate-700" />
                        <div>
                            <p className="text-sm font-bold text-white">Administrator</p>
                            <p className="text-xs text-slate-500">Super Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 rounded-xl hover:bg-slate-800 hover:text-red-400 transition-colors"
                    >
                        <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
