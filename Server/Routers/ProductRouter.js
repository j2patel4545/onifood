import express from "express";
import multer from "multer";
import path from "path";
import { createProduct, getProducts, getProductById, deleteProduct } from "../Controllers/ProductController.js";

const router = express.Router();

// ✅ Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ✅ Routes
router.post("/upload", upload.single("image"), createProduct);
router.get("/prd", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
