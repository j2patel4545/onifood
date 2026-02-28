import React from 'react';
import { motion } from 'framer-motion';

function About() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                            Serving the <span className="text-red-600">Finest Quality</span> Food since 2010.
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            At OniFood, we believe that great food has the power to bring people together. What started as a small local kitchen has grown into a passionate team of chefs and culinary artists dedicated to delivering exceptional dining experiences straight to your door.
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                            <div>
                                <p className="text-4xl font-black text-red-600 mb-2">15k+</p>
                                <p className="text-gray-500 font-medium">Happy Customers</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-red-600 mb-2">50+</p>
                                <p className="text-gray-500 font-medium">Master Chefs</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-orange-50 transform -rotate-3 scale-105 rounded-3xl -z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea8?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Kitchen Team"
                            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                            <div className="flex gap-1 text-yellow-400 mb-2">
                                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-sm font-semibold text-gray-900">"The best food delivery service I've ever used. Always fresh and on time!"</p>
                        </div>
                    </motion.div>

                </div>
            </div>

        </div>
    );
}

export default About;
