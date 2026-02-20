import React, { useContext, useEffect, useState } from 'react';
import Food from '../../Context/Fcontext';

function MYOrder() {
   const { shoppy, setShoppy } = useContext(Food); // Assuming setShoppy exists in context
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      // Calculate total price
      const total = shoppy.reduce((acc, item) => acc + item.price * item.qnt, 0);
      setTotalPrice(total); // Update total price
   }, [shoppy]);

   // Function to remove item from the order
   const removeFromOrder = (id) => {
      setShoppy((prevOrders) => {
         const updatedOrders = prevOrders.filter((item) => item.id !== id);
         localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Sync with localStorage
         return updatedOrders;
      });
   };
   

   return (
      <div className="py-20">
         <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>
         <div className="grid sm:grid-cols-4 items-center max-w-screen gap-4">
            {shoppy.length > 0 ? (
               shoppy.map((temp) => (
                  <div key={temp.id} className="flex w-full justify-center">
                     <div className="flex flex-col shadow-2xl h-[251px] w-[80%] rounded-2xl">
                        <img className="h-[70%] rounded-t-2xl object-cover" src={temp.image} alt={temp.name} />
                        <div className="h-[30%] flex items-center justify-between px-8">
                           <h2 className="text-lg font-semibold">{temp.name}</h2>
                           <button 
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                              onClick={() => removeFromOrder(temp.id)}
                           >
                              Remove
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p className="text-center text-lg font-semibold col-span-4">No items in your order</p>
            )}
         </div>

         {/* Total Products Section */}
         <div className="mt-8 text-center flex flex-col w-screen items-center">
            <div className='w-full py-5 bg-zinc-50 border-b-2 border-zinc-200 flex justify-evenly'>
               <b>Product</b>
               <b>Qnty</b>
               <b>Price</b>
               <b>Total</b>
            </div>
            <div className='w-full py-5 bg-zinc-50 border-b-2 border-zinc-200 flex flex-col justify-evenly'>
               {shoppy.map((temp) => (
                  <div key={temp.id} className='w-full border-b-[1px] border-zinc-200 flex justify-evenly'>
                     <i>{temp.name}</i>
                     <i>{temp.qnt}</i>
                     <i>{temp.price}</i>
                     <i>{temp.price * temp.qnt}</i>
                  </div>
               ))}
            </div>
            <h3 className="text-xl font-bold">Total Price: {totalPrice}</h3>
         </div>
      </div>
   );
}

export default MYOrder;
