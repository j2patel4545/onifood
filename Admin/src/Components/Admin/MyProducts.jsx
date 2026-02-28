import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash, HiOutlinePencilSquare, HiPlus, HiOutlineXMark, HiPhoto } from "react-icons/hi2";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Product State
  const [newProduct, setNewProduct] = useState({
    name: "",
    qnt: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8799/product/prd");
      setProducts(response.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8799/product/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // Handle Add Product Inputs
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Add Product Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.qnt || !newProduct.price || !newProduct.image) {
      toast.error("All fields are required!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("qnt", newProduct.qnt);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      await axios.post("http://localhost:8799/product/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      setNewProduct({ name: "", qnt: "", price: "", image: null });
      setPreview(null);
      setIsAddModalOpen(false);
      fetchProducts(); // Refresh list
    } catch (error) {
      toast.error("Error adding product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your menu items, pricing, and inventory.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 shadow-md shadow-red-500/20 transition-all active:scale-95"
        >
          <HiPlus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Table Filters/Search (Visual only for now) */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="flex gap-2">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2 outline-none">
              <option>All Categories</option>
              <option>Meals</option>
              <option>Drinks</option>
            </select>
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2 outline-none">
              <option>Sort by: Newest</option>
              <option>Sort by: Price High to Low</option>
            </select>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Product Details</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock (Qty)</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-3">
                      <span className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full"></span>
                      Loading products...
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <HiPhoto className="w-16 h-16 text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No products found</p>
                      <p className="text-sm">Get started by adding a new product to your menu.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={`http://localhost:8799${product.image}`}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop'; }}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{product.name}</p>
                          <p className="text-xs text-gray-500 font-mono text-opacity-70 mt-0.5">ID: {product._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium ${product.qnt < 10 && 'bg-orange-100 text-orange-700'}`}>
                        {product.qnt} Units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors">
                          <HiOutlinePencilSquare className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <HiOutlineXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body / Form */}
              <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium"
                    placeholder="e.g. Spicy Chicken Burger"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      name="qnt"
                      value={newProduct.qnt}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium"
                      placeholder="100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-red-500 hover:bg-red-50/50 transition-colors relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!preview}
                    />
                    <div className="space-y-1 text-center">
                      {preview ? (
                        <img src={preview} alt="Preview" className="mx-auto h-32 object-cover rounded-lg shadow-sm mb-2" />
                      ) : (
                        <HiPhoto className="mx-auto h-12 w-12 text-gray-300 group-hover:text-red-400 transition-colors" />
                      )}

                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none">
                          Upload a file
                        </span>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-4 flex gap-3 justify-end border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 text-white font-semibold rounded-xl shadow-md transition-all ${isSubmitting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/30 active:scale-95'
                      }`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MyProducts;
