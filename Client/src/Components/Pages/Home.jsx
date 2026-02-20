import React, { useEffect, useContext, useState } from "react";
import axios from 'axios'
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
  const [products, setProducts] = useState([]);
console.log(products);


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
    alert(`Added to card : ${item.name} × ${item.qnt} `)
  };
  
   useEffect(()=>{
    const fetchProducts = async () => {
      try {
       const response = await axios.get("http://localhost:8799/product/prd");
         console.log(response.data);
         setFoodie(response.data)
         
      } catch (error) {
       console.log("Fatch Error",error);
       
      }
     };
     fetchProducts();
   },[])
  


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
  <div className="min-h-screen bg-gray-50">

    {/* HERO SECTION */}
    <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-12 px-6 sm:px-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Delicious food delivered to your door 🍕
      </h1>
      <p className="text-white/90 mb-6">
        Discover the best dishes around you
      </p>

      <div className="relative max-w-xl bg-">
        <input
          type="search"
          placeholder="Search food..."
          className="w-full h-12 rounded-full pl-12 pr-4 bg-amber-50/50 text-black focus:outline-none shadow-lg"
        />
        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500" />
      </div>
    </section>

    {/* CATEGORY SECTION */}
    <section className="py-10 px-4 sm:px-16">
      <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-6">
        {Product.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="h-24 w-24 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium group-hover:text-red-500 transition">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* PRODUCTS SECTION */}
    <section className="px-4 sm:px-16 pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Restaurants Near You</h2>
        <button className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-lg shadow">
          <LuArrowDownUp /> Sort
        </button>
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8">
        {foodie.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={`http://localhost:8799${item.image}`}
                alt={item.name}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm shadow">
                ₹ {item.price}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item, "decrease")}
                  >
                    -
                  </button>
                  <span className="px-4">{item.qnt}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item, "increase")}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);
}

export default Home;
