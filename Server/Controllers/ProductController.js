import Product from "../Models/ProductModule.js";

// ✅ Create New Product
export const createProduct = async (req, res, next) => {
    try {
        const { name, qnt, price } = req.body;

        if (!name || !qnt || !price) {
            return res.status(400).json({ success: false, message: "Name, quantity, and price are required." });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product Image is required." });
        }

        const newProduct = new Product({
            name,
            qnt,
            price,
            image: `/uploads/${req.file.filename}`
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully!",
            product: newProduct
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get All Products
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        // NOTE: Keeping the raw array response here since the Client table maps directly over response.data for products currently. 
        // In a true refactor this would be { success: true, data: products }.
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// ✅ Get Single Product by ID
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// ✅ Delete Product by ID
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        next(error);
    }
};
