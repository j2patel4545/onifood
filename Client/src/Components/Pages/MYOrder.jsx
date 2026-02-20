import React, { useContext, useEffect, useState } from "react";
import Food from "../../Context/Fcontext";

function MYOrder() {
   const { shoppy, setShoppy } = useContext(Food);
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      const total = shoppy.reduce((acc, item) => acc + item.price * item.qnt, 0);
      setTotalPrice(total);
   }, [shoppy]);

   const removeFromOrder = (id) => {
      setShoppy((prevOrders) => {
         const updatedOrders = prevOrders.filter((item) => item.id !== id);
         localStorage.setItem("orders", JSON.stringify(updatedOrders));
         return updatedOrders;
      });
   };

   return (
      <div className="py-16 px-6 max-w-screen-lg mx-auto">
         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            My Orders
         </h2>

         {/* Orders Grid */}
         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shoppy.length > 0 ? (
               shoppy.map((temp) => (
                  <div key={temp.id} className="shadow-lg rounded-xl overflow-hidden bg-white">
                     <img
                        className="h-40 w-full object-cover"
                        src={`http://localhost:8799${temp.image}`}
                        alt={temp.name}
                     />
                     <div className="p-4 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700">{temp.name}</h3>
                        <button
                           className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-all"
                           onClick={() => removeFromOrder(temp.id)}
                        >
                           Remove
                        </button>
                     </div>
                  </div>
               ))
            ) : (
               <p className="text-center text-lg font-semibold col-span-4">
                  No items in your order
               </p>
            )}
         </div>

         {/* Total Products Section */}
         <div className="mt-10 w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="py-4 px-6 bg-gray-100 text-gray-700 font-semibold flex justify-between border-b">
               <span className="w-1/4">Product</span>
               <span className="w-1/4 text-center">Qnty</span>
               <span className="w-1/4 text-center">Price</span>
               <span className="w-1/4 text-right">Total</span>
            </div>
            <div className="divide-y">
               {shoppy.map((temp) => (
                  <div key={temp.id} className="py-4 px-6 flex justify-between text-gray-700">
                     <span className="w-1/4">{temp.name}</span>
                     <span className="w-1/4 text-center">{temp.qnt}</span>
                     <span className="w-1/4 text-center">${temp.price}</span>
                     <span className="w-1/4 text-right font-semibold">${temp.price * temp.qnt}</span>
                  </div>
               ))}
            </div>
            <div className="py-4 px-6 bg-gray-100 flex justify-between text-gray-800 font-bold text-lg">
               <span>Total Price:</span>
               <span>${totalPrice}</span>
            </div>
         </div>

         {/* Proceed to Pay Button */}
         {shoppy.length > 0 && (
            <div className="flex justify-center mt-6">
               <button
                  className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all shadow-md"
                  onClick={() => alert("Redirecting to payment...")}
               >
                  Proceed to Pay
               </button>
            </div>
         )}
      </div>
   );
}

export default MYOrder;
