import React, { useEffect, useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
import Food from "../../Context/Fcontext";
import { useNavigate } from "react-router-dom";
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
    { name: "Berries Cake", image: img12 },
    { name: "Paneer Pizza", image: img9 },
    { name: "Platter", image: img10 },
    { name: "Cheese Cake", image: img11 },
    { name: "Berries Cake", image: img12 },
  ];

  const { cola, setShoppy } = useContext(Food);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const [foodie, setFoodie] = useState([
    {
      name: "Amul",
      image: "https://images.pexels.com/photos/14509267/pexels-photo-14509267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      qnt: 1,
      price:90
    },
    {
      name: "Samosa",
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      qnt: 1,
      price:90
    },
    {
      name: "Vadapav",
      image: "https://media.istockphoto.com/id/1198087105/photo/vadapav.jpg?s=2048x2048&w=is&k=20&c=W3VZiwLywFM6qI7W1focRqj5Z-YbF-oXmucNf8VikBQ=",
      qnt: 1,
      price:90
    },
    {
      name: "Coffee",
      image: "https://images.pexels.com/photos/8732927/pexels-photo-8732927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      qnt: 1,
      price:90
    },
    {
      name: "Aloo Puri",
      image: "https://www.shutterstock.com/image-photo/aloo-puri-recipe-street-food-260nw-2243039581.jpg",
      qnt: 1,
      price:90
    },
    {
      name: "Jalebi",
      image: "https://images.pexels.com/photos/8887054/pexels-photo-8887054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      qnt: 1,
      price:90
    },
  ]);

  useEffect(() => {
    if (!cola) {
      navigate("/");
    }
  }, [cola, navigate]);

  if (!cola) {
    return <h2>Please login first</h2>;
  }

  const addToCart = (item) => {
    setShoppy((prev) => {
      return Array.isArray(prev) ? [...prev, item] : [item];
    });
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
    <div className="first section max-w-screen bg-pink-30 flex gap-1 flex-col">
      {/* Search Bar */}
      <div className="flex sm:w-full sm:hidden py-5 w-full px-5 relative">
        <input
          type="search"
          placeholder="Restaurant name, cuisine, or a dish..."
          className="px-8 h-12 rounded-md w-full border-[1px] border-zinc-400 pl-10"
        />
        <CiSearch className="absolute left-7 text-2xl top-1/2 transform -translate-y-1/2 font-bold text-red-500" />
      </div>
      <div className="flex  max-w-screen sm:pt-5  justify-evenly ">
        <div className="flex h-[125px] w-[180px] sm:h-96 sm:w-[40%] bg-[url('./Offer.png')] bg-no-repeat bg-cover rounded-md"></div>
        <div className="flex h-[125px] w-[180px] sm:h-96 sm:w-[40%] bg-[url('./Discounts.png')] bg-no-repeat bg-cover rounded-md"></div>
      </div>
      
      {/* Products Grid */}
      <div className="grid sm:grid-cols-8 grid-cols-4 max-w-full w-full py-10 overflow-hidden">
        {Product.map((item, index) =>
          isExpanded || (!isExpanded && index < 8) ? (
            <div className="flex flex-col justify-center items-center" key={index}>
              <img className="h-24 w-24 rounded-full px-3 py-3" src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
            </div>
          ) : null
        )}
        <div className="w-screen flex justify-center ">
          <button
            className="border border-black rounded-md w-[95%] max-w-md justify-center my-5 py-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>

      {/* Restaurants Near You */}
      <h2 className="text-xl font-semibold pl-6 -mt-8">396 restaurants around you</h2>
      <div className="grid sm:grid-cols-3 gap-8 items-center justify-center max-w-screen -mt-10 py-20">
        {foodie.map((item, index) => (
          <div className="flex w-full  justify-center" key={index}>
            <div className="flex flex-col h-[251px] sm:w-[26vw] w-[90vw] shadow-2xl rounded-2xl">
              <img className="flex h-[70%] rounded-t-2xl object-cover" src={item.image} alt={item.name} />
              <div className="grid grid-cols-2 h-[30%] items-center justify-between px-8">
               
                <h2 className="text-lg font-semibold">{item.name}</h2>
                
                <div className="flex items-center justify-center gap-2">
                  <button className="bg-gray-200 px-3 rounded-md" onClick={() => updateQuantity(item, "decrease")}>-</button>
                  <span className="text-lg">{item.qnt}</span>
                  <button className="bg-gray-200 px-3 rounded-md" onClick={() => updateQuantity(item, "increase")}>+</button>
                </div>
                <h2>price: {item.price} ₹</h2>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-black text-white h-10 rounded-2xl flex justify-center items-center px-6"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
