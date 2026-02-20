import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const Admin = () => {
  const [product, setProduct] = useState({
    name: "",
    qnt: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle File Upload (Drag & Drop)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.qnt || !product.price || !product.image) {
      setMessage("❌ All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("qnt", product.qnt);
    formData.append("price", product.price);
    formData.append("image", product.image);

    try {
      const response = await axios.post("http://localhost:8799/product/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Product added successfully!");
      setProduct({ name: "", qnt: "", price: "", image: null });
      setPreview(null);
      console.log(response.data);
    } catch (error) {
      setMessage("❌ Error adding product!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">🛒 Add New Product</h2>

        {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              name="qnt"
              placeholder="Enter quantity"
              value={product.qnt}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>

          {/* File Upload Input */}
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center relative hover:bg-gray-50 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FaCloudUploadAlt className="text-gray-400 text-5xl mx-auto" />
            <p className="text-gray-600 font-medium mt-2">Click or Drag & Drop an Image</p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border-4 border-blue-300 shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
