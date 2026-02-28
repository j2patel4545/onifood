import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiMagnifyingGlass, HiOutlineFire } from 'react-icons/hi2';
import toast from 'react-hot-toast';

function Menu() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fixed categories for UI visual matching the theme
    const categories = ['All', 'Burgers', 'Pizza', 'Drinks', 'Desserts', 'Healthy'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8799/product/prd");
                setProducts(response.data);
            } catch (err) {
                toast.error("Failed to load menu items!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        // Basic cart logic leveraging local storage for now
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = existingCart.findIndex(item => item._id === product._id);

        if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        toast.success(`Added ${product.name} to cart!`, { icon: '🎒' });
    };

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">

            {/* Header Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
                        >
                            Our <span className="text-red-600">Delicious</span> Menu
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 mb-8"
                        >
                            Explore our wide variety of mouth-watering dishes crafted with the finest ingredients just for you.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-xl mx-auto"
                        >
                            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Search for your favorite food..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-red-500 focus:ring-0 text-gray-900 font-medium shadow-sm transition-all outline-none"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

                {/* Categories Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full whitespace-nowrap font-semibold transition-all ${activeCategory === category
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-red-500 hover:text-red-500'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
                                <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-900">No items found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={product._id}
                                    className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl border border-gray-100 transition-all group relative overflow-hidden flex flex-col h-full"
                                >
                                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm flex items-center gap-1">
                                        <HiOutlineFire className="w-3 h-3" /> Popular
                                    </div>

                                    <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-50 mb-4">
                                        <img
                                            src={`http://localhost:8799${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop'; }}
                                        />
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-1">{product.name}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">Authentic and freshly prepared using premium ingredients.</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-red-600 font-bold text-lg">₹</span>
                                            <span className="text-2xl font-black text-gray-900">{product.price}</span>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95 group/btn"
                                        >
                                            <HiOutlineShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Menu;
