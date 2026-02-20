import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // ✅ Import Trash Icon

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8799/product/prd");
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (err) {
        setError("❌ Failed to load products!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Handle Product Deletion
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:8799/product/${productId}`);

      // ✅ Remove the deleted product from UI
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

      console.log(`🗑️ Product ${productId} deleted successfully!`);
    } catch (err) {
      console.error("❌ Failed to delete product!", err);
      alert("❌ Could not delete product. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
         My Product List
      </h2>

      {/* ✅ Show Loading Message */}
      {loading && <p className="text-center text-gray-500">⏳ Loading products...</p>}

      {/* ✅ Show Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ Show No Products Message */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">🚫 No products available.</p>
      )}

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative"
          >
            {/* ✅ Product Image */}
            <img
              src={`http://localhost:8799${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Default placeholder if image fails
            />

            {/* ✅ Product Details */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">📦 Quantity: <span className="font-medium">{product.qnt}</span></p>
              <p className="text-green-600 font-semibold text-lg">💲 ${product.price}</p>
            </div>

            {/* ✅ Remove Product Button */}
            <button
              onClick={() => handleDelete(product._id)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
