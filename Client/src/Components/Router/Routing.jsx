import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Header from '../Layouts/Header';
import First from '../Pages/First';
import Home from '../Pages/Home';
import MYOrder from '../Pages/MYOrder';
import Profile from '../Pages/Profile';
import Admin from '../Admin/Admin';
import MyProducts from '../Admin/MyProducts';
import Footerdas from '../Footerdas';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reg' element={<Register />} />

        {/* <Route path='/fs' element={<><Header/><First/></>}/> */}
        <Route path='/home' element={<><Header/><Home/><Footerdas/></>}/>
        <Route path='/my' element={<><Header/><MYOrder/></>}/>
        <Route path='/p' element={<><Header/><Profile/></>}/>
        <Route path='/admin' element={<><Header/><Admin/></>}/>
        <Route path='/products' element={<><Header/><MyProducts/></>}/>



      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
