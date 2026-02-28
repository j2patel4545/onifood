import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Imports
import DatabaseConnection from "./Database/Db.js";
import UserRouter from "./Routers/UserRouter.js";
import ProductRouter from "./Routers/ProductRouter.js";
import OrderRouter from "./Routers/OrderRouter.js";
import CategoryRouter from "./Routers/CategoryRouter.js";
import errorHandler from "./Middlewares/errorHandler.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8799;

// Get Correct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Global Middleware Stack
// ==========================================

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: false, // Needed to serve images cross-origin
}));

// Request Logging
app.use(morgan('dev'));

// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Client & Admin UI
    credentials: true
}));

// Body & Cookie Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve Uploaded Files Correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================================
// Database & Routing
// ==========================================
DatabaseConnection()
    .then(() => {
        console.log("✅ Database Connected Successfully!");

        // API Routes
        app.get("/", (req, res) => {
            res.send("🚀 Api v2 is Running Securely!");
        });

        app.use("/user", UserRouter);
        app.use("/product", ProductRouter);
        app.use("/order", OrderRouter);
        app.use("/category", CategoryRouter);

        // 404 Handler
        app.use((req, res, next) => {
            const error = new Error(`Not Found - ${req.originalUrl}`);
            error.statusCode = 404;
            next(error);
        });

        // Global Error Handler (Must be LAST)
        app.use(errorHandler);

        // Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server Running: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1);
    });
