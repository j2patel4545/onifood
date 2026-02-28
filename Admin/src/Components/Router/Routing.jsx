import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import AdminLayout from '../Layouts/AdminLayout';

// Pages
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Admin from '../Admin/Admin';
import MyProducts from '../Admin/MyProducts';
import Orders from '../Admin/Orders';
import Users from '../Admin/Users';

function Routing() {
  return (
    <BrowserRouter>
      {/* Global Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Auth Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/reg' element={<Register />} />

        {/* Protected Dashboard Routes wrapped in AdminLayout */}
        <Route path='/admin' element={<AdminLayout />}>
          {/* Index route for dashboard home */}
          <Route index element={<Admin />} />
          {/* Sub-routes */}
          <Route path='products' element={<MyProducts />} />

          {/* New expanded scope features */}
          <Route path='orders' element={<Orders />} />
          <Route path='users' element={<Users />} />
          <Route path='settings' element={<div className="p-8 text-2xl font-bold">Admin Settings (Coming Soon)</div>} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
