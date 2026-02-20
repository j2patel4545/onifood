import Product from "../Models/ProductModule.js";

// ✅ Create New Product
export const createProduct = async (req, res) => {
    try {
        const { name, qnt, price } = req.body;
        if (!req.file) return res.status(400).json({ error: "Image is required" });

        const newProduct = new Product({
            name,
            qnt,
            price,
            image: `/uploads/${req.file.filename}`
        });

        await newProduct.save();
        res.json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Single Product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
