import React from 'react';
import { HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi2';

function Users() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage customers, admins, and permissions.</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 shadow-md shadow-red-500/20 transition-all active:scale-95">
                    Add New User
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-red-400 text-sm font-bold uppercase tracking-wider mb-1">Total Users</p>
                        <h3 className="text-4xl font-black">2,451</h3>
                        <p className="text-gray-400 text-sm mt-4">+125 this week</p>
                    </div>
                    <HiOutlineUserGroup className="absolute -bottom-4 -right-4 w-32 h-32 text-gray-700 opacity-50" />
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Admin Accounts</p>
                        <h3 className="text-4xl font-black text-gray-900">4</h3>
                        <div className="flex mt-4 -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={`https://ui-avatars.com/api/?name=Admin+${i}&background=random`} alt="" />
                            ))}
                        </div>
                    </div>
                    <HiOutlineShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-red-50" />
                </div>
            </div>

            {/* Placeholder State */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <HiOutlineUserGroup className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to Users Database...</h3>
                <p className="text-gray-500 text-center max-w-md">
                    The User metrics and table view will become fully interactive once the advanced database refactor is complete.
                </p>
            </div>

        </div>
    );
}

export default Users;
