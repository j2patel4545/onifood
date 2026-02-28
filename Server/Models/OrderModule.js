import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true },
                image: { type: String }
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true, default: "India" }
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Card", "UPI"],
            default: "COD"
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed", "Refunded"],
            default: "Pending"
        },
        orderStatus: {
            type: String,
            enum: ["Processing", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
            default: "Processing"
        },
        deliveryInstructions: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
