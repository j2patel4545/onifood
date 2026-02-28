import React, { useContext, useEffect, useState } from "react";
import Food from "../../Context/Fcontext";
import { HiOutlineTrash, HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function MYOrder() {
   const { shoppy, setShoppy } = useContext(Food);
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      const total = shoppy.reduce((acc, item) => acc + item.price * item.qnt, 0);
      setTotalPrice(total);
   }, [shoppy]);

   const removeFromOrder = (id) => {
      setShoppy((prevOrders) => {
         const updatedOrders = prevOrders.filter((item) => item._id !== id);
         return updatedOrders;
      });
      toast.success("Item removed from your order");
   };

   const handleCheckout = () => {
      toast.success("Proceeding to secure checkout...", { icon: '🔒' });
      // Add real checkout routing here later
   };

   return (
      <div className="py-10 px-4 sm:px-8 max-w-6xl mx-auto min-h-[70vh]">

         <div className="flex items-center gap-3 mb-8">
            <HiOutlineShoppingBag className="text-3xl text-red-500" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
               Your Order Summary
            </h2>
         </div>

         {shoppy.length === 0 ? (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm"
            >
               <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" className="h-48 mb-6 opacity-80" />
               <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
               <p className="text-gray-500 mb-6 text-center max-w-sm">Looks like you haven't added any delicious meals to your cart yet.</p>
               <Link to="/home" className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition shadow-lg hover:shadow-red-500/30">
                  Start Ordering
               </Link>
            </motion.div>
         ) : (
            <div className="flex flex-col lg:flex-row gap-10">

               {/* Cart Items List */}
               <div className="lg:w-2/3 space-y-4">
                  <AnimatePresence>
                     {shoppy.map((temp) => (
                        <motion.div
                           key={temp._id}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -100, scale: 0.9 }}
                           className="flex flex-col sm:flex-row shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden bg-white transition-all group items-center"
                        >
                           <img
                              className="h-32 w-full sm:w-40 object-cover"
                              src={temp.image.startsWith('http') ? temp.image : `http://localhost:8799${temp.image}`}
                              alt={temp.name}
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'; }}
                           />
                           <div className="p-5 flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between">
                              <div>
                                 <h3 className="text-xl font-bold text-gray-800 mb-1">{temp.name}</h3>
                                 <p className="text-sm text-gray-500 font-medium tracking-wide">Qty: {temp.qnt} × ₹{temp.price}</p>
                              </div>

                              <div className="flex items-center justify-between mt-4 sm:mt-0 sm:flex-col sm:items-end gap-2">
                                 <span className="text-xl font-black text-gray-900">₹{temp.price * temp.qnt}</span>
                                 <button
                                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-all group-hover:scale-105"
                                    onClick={() => removeFromOrder(temp._id)}
                                 >
                                    <HiOutlineTrash className="text-lg" />
                                    <span className="hidden sm:inline">Remove</span>
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>

               {/* Order Bill Summary */}
               <div className="lg:w-1/3">
                  <div className="bg-white shadow-xl rounded-3xl p-6 md:p-8 border border-gray-100 sticky top-24">
                     <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">Bill Details</h3>

                     <div className="space-y-4 text-sm font-medium text-gray-600">
                        <div className="flex justify-between items-center">
                           <span>Item Total ({shoppy.length} items)</span>
                           <span className="text-gray-900">₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span>Delivery Fee</span>
                           <span className="text-green-600">FREE</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span>Platform Fee</span>
                           <span className="text-gray-900">₹15</span>
                        </div>

                        <div className="pt-4 mt-4 border-t border-dashed border-gray-300 flex justify-between items-center text-xl font-black text-gray-900">
                           <span>To Pay</span>
                           <span>₹{totalPrice + 15}</span>
                        </div>
                     </div>

                     <button
                        className="w-full mt-8 bg-black text-white px-6 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95 group"
                        onClick={handleCheckout}
                     >
                        Proceed to Checkout
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                     </button>

                     <p className="text-xs text-center text-gray-400 mt-4 font-medium uppercase tracking-wider">
                        100% SECURE PAYMENTS
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default MYOrder;
