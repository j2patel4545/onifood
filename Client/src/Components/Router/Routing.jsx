import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts and Pages
import Layout from '../Layouts/Layout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Menu from '../Pages/Menu';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import MYOrder from '../Pages/MYOrder';
import Profile from '../Pages/Profile';

function Routing() {
  return (
    <BrowserRouter>
      {/* Global Toast Notifications Configured */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
      <Routes>
        {/* Public Routes without Layout */}
        <Route path='/' element={<Login />} />
        <Route path='/reg' element={<Register />} />

        {/* Protected Routes using Global Layout */}
        <Route element={<Layout />}>
          <Route path='/das' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my' element={<MYOrder />} />
          <Route path='/p' element={<Profile />} />
        </Route>

        {/* Fallback to Home if unknown route */}
        <Route path='*' element={<Navigate to="/das" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
