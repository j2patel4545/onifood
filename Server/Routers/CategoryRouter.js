import express from "express";
import { createCategory, getAllCategories, updateCategory } from "../Controllers/CategoryController.js";

const router = express.Router();

// Public Routes
router.get("/all", getAllCategories);

// Admin Routes 
router.post("/create", createCategory);
router.put("/update/:id", updateCategory);

export default router;
