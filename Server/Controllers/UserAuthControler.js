import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModule.js";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// ✅ 1. User Registration
export const UserRegister = async (req, res, next) => {
    try {
        const { Username, email, password, mobileNumber, Address, role } = req.body;

        if (!Username || !email || !password || !Address) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exists. Please Login." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            Username,
            email,
            password: hashedPassword,
            mobileNumber,
            Address,
            role: role || 'user'
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User Registered Successfully!" });
    } catch (error) {
        next(error);
    }
};

// ✅ 2. User Login
export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (!user.password) {
            return res.status(400).json({ success: false, message: "User account is missing a password. Please register again or contact support." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful!",
            token,
            user: {
                id: user._id,
                Username: user.Username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// ✅ 3. User Profile
export const UserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password -__v");
        if (!user) {
            return res.status(404).json({ success: false, message: "User Profile not found." });
        }

        res.status(200).json({ success: true, message: "User Profile Data", user });
    } catch (error) {
        next(error);
    }
};
