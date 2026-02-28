import React, { useEffect, useState, useContext } from 'react';
import Food from '../../Context/Fcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineMapPin, HiPencilSquare, HiOutlineTrash } from 'react-icons/hi2';

function Profile() {
    const { cola } = useContext(Food);
    const [updateHandler, setUpdateHandler] = useState(false);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8799/user/profile/${cola._id}`);
                const user = response.data?.user;
                if (user) {
                    setUserData(user);
                    setUsername(user.Username || "");
                    setEmail(user.email || "");
                    setAddress(user.Address || "");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load profile data");
            }
        };
        fetchUserData();
    }, [cola._id, updateHandler]);

    const updatePush = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        if (!username || !email || !address) {
            toast.error("All fields are required!");
            setIsSaving(false);
            return;
        }
        try {
            await axios.put(`http://localhost:8799/user/update/${cola._id}`, {
                email,
                Username: username,
                Address: address
            });
            toast.success("Profile updated successfully! 🎉");
            setUpdateHandler(false);
        } catch (error) {
            console.error("User Update Failed:", error);
            toast.error("Profile update failed. Try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const dltHandler = async () => {
        const promise = new Promise(async (resolve, reject) => {
            try {
                await axios.delete(`http://localhost:8799/user/dlt/${cola._id}`);
                localStorage.removeItem('user');
                localStorage.removeItem('christi');
                navigate('/');
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        toast.promise(promise, {
            loading: 'Deleting account...',
            success: 'Account permanently deleted.',
            error: 'Failed to delete account.',
        });
    };

    if (!userData) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[75vh] flex items-center justify-center p-4 py-12">
            <AnimatePresence mode="wait">
                {updateHandler ? (
                    <motion.div
                        key="edit"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 p-8"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                            <p className="text-sm text-gray-500">Update your personal details</p>
                        </div>

                        <form onSubmit={updatePush} className="space-y-6">

                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <img src="https://ui-avatars.com/api/?name=User&background=random&size=128" alt="Avatar" className="h-28 w-28 rounded-full shadow-md object-cover border-4 border-white" />
                                    <div className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full cursor-pointer shadow hover:bg-red-600 transition">
                                        <HiPencilSquare />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
                                    placeholder="Enter Username"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
                                    placeholder="123 Street Code, City"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setUpdateHandler(false)}
                                    className="flex-1 h-12 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`flex-1 h-12 rounded-xl font-bold text-white transition shadow-md ${isSaving ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700 active:scale-95'
                                        }`}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="view"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
                    >
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 h-32 relative">
                            <img src="https://ui-avatars.com/api/?name=User&background=random&size=128" alt="Profile" className="absolute -bottom-12 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full border-4 border-white shadow-lg bg-white" />
                        </div>

                        <div className="px-8 pt-16 pb-8 text-center">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{userData.Username}</h2>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-6">Active User</span>

                            <div className="space-y-4 text-left bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <HiOutlineEnvelope className="text-xl text-red-500" />
                                    <span className="font-medium">{userData.email || "No email linked"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <HiOutlineMapPin className="text-xl text-red-500" />
                                    <span className="font-medium">{userData.Address || "No address saved"}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setUpdateHandler(true)}
                                    className="w-full flex items-center justify-center gap-2 h-12 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition shadow hover:shadow-lg active:scale-95"
                                >
                                    <HiPencilSquare className="text-lg" /> Edit Profile
                                </button>

                                <button
                                    onClick={() => {
                                        if (window.confirm("Delete account permanently?")) dltHandler();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 h-12 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition active:scale-95"
                                >
                                    <HiOutlineTrash className="text-lg" /> Delete Account
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Profile;
