import React, { useEffect, useContext, useState } from "react";
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
import Food from "../../Context/Fcontext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import img1 from "./ast/one.jpg";
import img2 from "./ast/Two.jpg";
import img3 from "./ast/Three.jpg";
import img4 from "./ast/Four.jpg";
import img5 from "./ast/Five.jpg";
import img6 from "./ast/Six.jpg";
import img7 from "./ast/Seven.jpg";
import img8 from "./ast/Eight.jpg";
import img9 from "./ast/Nine.jpg";
import img10 from "./ast/Ten.jpg";
import img11 from "./ast/Eleven.jpg";
import img12 from "./ast/Twelve.jpg";

function Home() {
  const Product = [
    { name: "Noodles", image: img1 },
    { name: "Ice-cream", image: img2 },
    { name: "Sweets", image: img3 },
    { name: "Paneer Salad", image: img4 },
    { name: "Mishti Dahi", image: img5 },
    { name: "Gulab Jamun", image: img6 },
    { name: "Cheese Pasta", image: img7 },
    { name: "Butter Dal", image: img8 },
    { name: "Paneer Pizza", image: img9 },
    { name: "Platter", image: img10 },
    { name: "Cheese Cake", image: img11 },
    { name: "Berries Cake", image: img12 }
  ];

  const { cola, setShoppy } = useContext(Food);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial state matching previous logic
  const [foodie, setFoodie] = useState([
    {
      name: "Amul",
      image: "https://images.pexels.com/photos/14509267/pexels-photo-14509267.jpeg",
      qnt: 1,
      price: 90
    }
  ]);

  useEffect(() => {
    if (!cola) {
      navigate("/");
    }
  }, [cola, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8799/product/prd");
        if (response.data.length > 0) {
          setFoodie(response.data);
        }
      } catch (error) {
        toast.error("Failed to load products from server");
        console.log("Fetch Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (!cola) {
    return <div className="h-screen flex items-center justify-center font-semibold text-lg">Please login to continue...</div>;
  }

  const addToCart = (item) => {
    setShoppy((prev) => {
      return Array.isArray(prev) ? [...prev, item] : [item];
    });
    // Replaced standard alert with elegant toast
    toast.success(`Added ${item.name} to cart!`);
  };

  const updateQuantity = (temp, action) => {
    setFoodie((prevFoodie) =>
      prevFoodie.map((item) =>
        item.name === temp.name
          ? { ...item, qnt: action === "increase" ? item.qnt + 1 : Math.max(item.qnt - 1, 1) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Redesigned */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 text-white p-10 sm:p-16 shadow-2xl mb-12"
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Craving Something <span className="text-yellow-300 decoration-wavy underline decoration-4 underline-offset-8">Delicious?</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 font-medium">
            Get the best food from top restaurants delivered blazing fast to your doorstep.
          </p>

          <div className="relative max-w-lg">
            <input
              type="search"
              placeholder="Search dishes, restaurants..."
              className="w-full h-14 rounded-full pl-14 pr-6 bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-xl text-lg transition-all"
            />
            <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl text-gray-400" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition shadow">
              Search
            </button>
          </div>
        </div>

        {/* Decorative Blur Orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-40 w-80 h-80 bg-orange-600/40 rounded-full blur-3xl"></div>
      </motion.section>

      {/* CATEGORY SECTION */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Top Categories</h2>
        </div>

        <div className="flex overflow-x-auto pb-6 gap-6 hide-scrollbar scroll-smooth">
          {Product.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              key={index}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer w-28"
            >
              <div className="h-24 w-24 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-red-500 group-hover:shadow-red-200 transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-gray-700 group-hover:text-red-500 transition line-clamp-1 text-center">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Trending Near You</h2>
          <button className="flex items-center gap-2 text-sm font-medium bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm hover:shadow hover:bg-gray-50 transition">
            <LuArrowDownUp /> Sort By
          </button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foodie.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={item.image.startsWith('http') ? item.image : `http://localhost:8799${item.image}`}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'; }}
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full font-bold text-gray-800 shadow-lg">
                    ₹{item.price}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">Authentic taste made with fresh ingredients</p>
                  </div>

                  {/* Interactivity Area */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-600 font-bold transition"
                        onClick={() => updateQuantity(item, "decrease")}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-800">{item.qnt}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-600 font-bold transition"
                        onClick={() => updateQuantity(item, "increase")}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
