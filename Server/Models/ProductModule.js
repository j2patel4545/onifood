import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qnt: { type: Number, required: true }, // Quantity as a number
    price: { type: Number, required: true }, // Price as a number
    image: { type: String, required: true }, // Stores image file path
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", ProductSchema);
