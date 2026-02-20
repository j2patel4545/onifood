import React, { useState, useContext } from 'react';
import { CgMenu } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Food from '../../Context/Fcontext';
import { AiOutlineLogout } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";



function Header() {
  const [open, setOpen] = useState(false);
  const { setCola } = useContext(Food);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCola(null); // Update state to reflect logout
    navigate("/"); // Redirect to login page
  };

  return (
    <div className='max-w-screen border-zinc-200 shadow sahd'>
      {/* Menu Closed */}
      {!open && (
        <div className='flex max-w-screen font-bold h-16 justify-between items-center px-5 sm:px-0'>
          <div className='flex sm:w-[15%] text-xl sm:pl-20'>
           <h2>Admin Pannel</h2>
          </div>


           <div className="hidden sm:w-[70%] sm:flex justify-center py-5 w-full px-5 relative">
                  <input
                    type="search"
                    placeholder="Restaurant name, cuisine, or a dish..."
                    className="px-8 h-12 rounded-md w-[60%] border-[1px] border-zinc-400 pl-10"
                  />
                  <CiSearch className="absolute left-46 text-2xl top-1/2 transform -translate-y-1/2 font-bold text-red-500" />
                </div>
        
          <h3 className='w-[70%] h-[60%] border-b-2  sm:hidden border-black border-dotted'></h3>
          <h4 onClick={() => setOpen(true)} className='flex sm:hidden items-center h-full w-[15%]'>
            <CgMenu className='h-2/3 w-full' />
          </h4>
          <h4 className=' sm:flex gap- hidden sm:pr-20 justify-center items-center'>
            <Link className='flex w-26 ' to='/admin'>Home</Link>
            <Link className='flex w-26 ' to='/products'> Products</Link>

            <Link className='flex  w-26' to='/p'>Profile</Link>
           <h2 className='flex justify-center  w-32 items-center gap-2 text-red-500 font-bold' onClick={handleLogout}>Log out<AiOutlineLogout />
           </h2>


          </h4>
        </div>
      )}

      {/* Menu Open */}
      {open && (
        <div className='bg-black flex flex-col text-amber-50 h-screen w-screen'>
          <h2 className='flex h-16 w-full justify-end'>
            <MdCancel onClick={() => setOpen(false)} className='h-full w-auto px-10 mt-4' />
          </h2>
          <h3 className='w-screen flex flex-col items-center text-3xl justify-center mt-15'>
            <Link onClick={() => setOpen(false)} to='/my'>My Cart</Link>
            <h4>
              <button onClick={handleLogout} className="text-red-500 font-bold">Logout</button>
            </h4>
          </h3>
        </div>
      )}
    </div>
  );
}

export default Header;
