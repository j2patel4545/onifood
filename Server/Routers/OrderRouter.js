import express from "express";
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus } from "../Controllers/OrderController.js";

const router = express.Router();

// Public / User Routes
router.post("/create", createOrder);
router.get("/user/:userId", getUserOrders);

// Admin Routes
router.get("/all", getAllOrders);
router.put("/:id/status", updateOrderStatus);

export default router;
