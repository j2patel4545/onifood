import Category from "../Models/CategoryModule.js";

// ✅ 1. Create a New Category (Admin)
export const createCategory = async (req, res, next) => {
    try {
        const { name, description, image } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Category name is required." });
        }

        // Check if category exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists." });
        }

        const newCategory = new Category({ name, description, image });
        const savedCategory = await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully!",
            category: savedCategory,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ 2. Get All Categories (Public)
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ 3. Update Category (Admin)
export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        res.status(200).json({
            success: true,
            message: "Category updated.",
            category: updatedCategory,
        });
    } catch (error) {
        next(error);
    }
};
