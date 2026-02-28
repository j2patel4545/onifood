import Order from "../Models/OrderModule.js";

// ✅ 1. Create a New Order
export const createOrder = async (req, res, next) => {
    try {
        const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

        // Basic Validation
        if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
            return res.status(400).json({ success: false, message: "Missing required order fields." });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: savedOrder,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ 2. Get All Orders (Admin)
export const getAllOrders = async (req, res, next) => {
    try {
        // Populate user details for the admin view
        const orders = await Order.find()
            .populate("userId", "name email contact")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ 3. Get User Orders
export const getUserOrders = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ 4. Update Order Status (Admin)
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated.",
            order: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};
