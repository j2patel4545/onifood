import React from 'react';
import { HiOutlineClock, HiOutlineDocumentCheck, HiOutlineTruck } from 'react-icons/hi2';

function Orders() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Track and manage incoming customer orders.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button className="px-4 py-1.5 text-sm font-semibold bg-white rounded-lg shadow-sm text-gray-900 transition-all">All Orders</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all">Pending</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all">Delivered</button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                        <HiOutlineClock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">24</p>
                        <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <HiOutlineTruck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                        <p className="text-sm font-medium text-gray-500">Out for Delivery</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <HiOutlineDocumentCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">145</p>
                        <p className="text-sm font-medium text-gray-500">Delivered Today</p>
                    </div>
                </div>
            </div>

            {/* Placeholder State */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <HiOutlineDocumentCheck className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order System Connecting...</h3>
                <p className="text-gray-500 text-center max-w-md">
                    The advanced order management database schema is currently being built. Real-time orders will populate here shortly.
                </p>
                <button disabled className="mt-6 px-6 py-2.5 bg-gray-100 text-gray-400 font-semibold rounded-xl cursor-not-allowed">
                    View Live DB
                </button>
            </div>

        </div>
    );
}

export default Orders;
