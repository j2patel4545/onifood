import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineArrowTrendingUp,
  HiArrowUpRight,
  HiArrowDownRight
} from 'react-icons/hi2';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

function Admin() {
  // Mock Data for Charts
  const revenueData = [
    { name: 'Mon', current: 4000, previous: 2400 },
    { name: 'Tue', current: 3000, previous: 1398 },
    { name: 'Wed', current: 2000, previous: 9800 },
    { name: 'Thu', current: 2780, previous: 3908 },
    { name: 'Fri', current: 1890, previous: 4800 },
    { name: 'Sat', current: 2390, previous: 3800 },
    { name: 'Sun', current: 3490, previous: 4300 },
  ];

  const orderData = [
    { name: 'Burgers', orders: 400 },
    { name: 'Pizza', orders: 300 },
    { name: 'Sushi', orders: 200 },
    { name: 'Drinks', orders: 278 },
    { name: 'Desserts', orders: 189 },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', items: 3, total: '$45.00', status: 'Delivered', date: '2 Mins ago' },
    { id: '#ORD-002', customer: 'Emma Smith', items: 1, total: '$12.50', status: 'Preparing', date: '15 Mins ago' },
    { id: '#ORD-003', customer: 'Michael Brown', items: 5, total: '$112.00', status: 'Pending', date: '1 Hour ago' },
    { id: '#ORD-004', customer: 'Sarah Wilson', items: 2, total: '$24.00', status: 'Delivered', date: '2 Hours ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Preparing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-all">
            Export Report
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 shadow-sm transition-all shadow-red-500/30">
            View Live Store
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$24,562.00', trend: '+12.5%', isUp: true, icon: <HiOutlineCurrencyDollar className="w-6 h-6 text-emerald-500" />, bg: 'bg-emerald-50' },
          { title: 'Total Orders', value: '1,245', trend: '+5.2%', isUp: true, icon: <HiOutlineShoppingBag className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
          { title: 'Active Customers', value: '842', trend: '-1.4%', isUp: false, icon: <HiOutlineUsers className="w-6 h-6 text-purple-500" />, bg: 'bg-purple-50' },
          { title: 'Conversion Rate', value: '4.6%', trend: '+0.8%', isUp: true, icon: <HiOutlineArrowTrendingUp className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50' },
        ].map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`flex items-center text-sm font-semibold ${stat.isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.isUp ? <HiArrowUpRight className="w-4 h-4 mr-1" /> : <HiArrowDownRight className="w-4 h-4 mr-1" />}
                {stat.trend}
              </span>
              <span className="text-sm text-gray-400">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="previous" stroke="#cbd5e1" strokeWidth={2} fillOpacity={1} fill="url(#colorPrev)" name="Previous Period" />
                <Area type="monotone" dataKey="current" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" name="Current Period" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Orders by Category</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">Recent Live Orders</h3>
          <button className="text-red-500 text-sm font-semibold hover:text-red-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.items} Items</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}

export default Admin;
