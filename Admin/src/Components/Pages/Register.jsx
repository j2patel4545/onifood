import React, { useState } from 'react'
import axios  from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { HiCloudDownload } from 'react-icons/hi';


function Register() {
  const [email,Setemail]=useState("");
  const [mobileNumber,SetmobileNumber]=useState("");
  const [Username,SetUsername]=useState("");
  const [Address,Setaddress]=useState("");
  
  const Navigate= useNavigate();
  console.log(email,mobileNumber);
  const abc=async(e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8799/user/register",{email,mobileNumber,Address,Username})
      alert("succes");
      Navigate('/');
      
    } catch (error) {
      alert("failed");
      Navigate('/reg')
    }
  }
  
  return (
    <div>
        <div className='flex flex-col gap-2 justify-center items-center min-h-screen min-w-screen bg-gradient-to-r from-[#CB202D] to-[#EC0C92]'>
            <form onSubmit={abc} className='flex-col flex gap-10 justify-center' action="">
            <input className=' flex h-14 w-86 bg-amber-50   rounded-md px-3 text-2xl 'value={Username} onChange={(e)=>{SetUsername(e.target.value)}} placeholder='Username' type="text"/>
                <input className=' flex h-14 w-86 bg-amber-50   rounded-md px-3 text-2xl 'value={email} onChange={(e)=>{Setemail(e.target.value)}} placeholder='Email' type="text"/>
                <input className=' flex h-14 w-86 bg-amber-50 rounded-md  px-3 text-2xl ' value={mobileNumber} onChange={(e)=>{SetmobileNumber(e.target.value)}} placeholder='MobileNumber :' type="text"/>
                <input className=' flex h-14 w-86 bg-amber-50 rounded-md  px-3 text-2xl ' value={Address} onChange={(e)=>{Setaddress(e.target.value)}} placeholder='Address :' type="text"/>


                  <button type='submit' className='flex bg-black text-white h-14 w-86 rounded-md justify-center text-2xl items-center '>Register</button>
            </form>
            <h2 className='flex  '><h3>have account...? </h3> <Link  to={'/'} className='text-white'>Login</Link></h2>
            <link rel="stylesheet" href="" />
        </div>
    </div>
  
  )
}

export default Register