import React, { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { HiBars3, HiOutlineBell, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Food from "../../Context/Fcontext";

function AdminLayout() {
    const { cola } = useContext(Food);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!cola) {
            navigate("/");
        } else if (cola.role !== 'admin') {
            navigate("/");
        }
    }, [cola, navigate]);

    if (!cola || cola.role !== 'admin') {
        return null; // Or a loading spinner
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-[#f3f4f6] font-sans overflow-hidden">

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col max-w-full overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between z-10 sticky top-0 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <HiBars3 className="w-7 h-7" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Admin Portal</h1>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative hidden md:block">
                            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-inner"
                            />
                        </div>

                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <HiOutlineBell className="w-6 h-6" />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Dynamic Page Content rendered by React Router */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;
