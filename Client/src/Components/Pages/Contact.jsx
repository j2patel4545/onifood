import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2';

function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">

            {/* Header Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
                    >
                        Get in <span className="text-red-600">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Have questions, feedback, or an issue with your order? Our support team is here to help you 24/7. Drop us a message below.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Contact Information Cards */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <HiOutlineMapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">Our Location</h3>
                            <p className="text-gray-500 font-medium">123 Culinary Hub Avenue, Food District, FD 456012</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <HiOutlinePhone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                            <p className="text-gray-500 font-medium">+1 (800) 123-4567</p>
                            <p className="text-gray-400 text-sm mt-1">Available Everyday 9 AM - 11 PM</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <HiOutlineEnvelope className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                            <p className="text-gray-500 font-medium">support@onifood.com</p>
                            <p className="text-gray-400 text-sm mt-1">We typically reply within 24 hours</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-8 relative z-10">Send us a Message</h2>

                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-700 transition-all active:scale-95"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contact;
