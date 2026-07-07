const Category = require('../models/Category');

// Get all categories for user
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, color, icon } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a category name' });
    }

    const category = await Category.create({
      userId: req.user.id,
      name,
      color,
      icon,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (category.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this category' });
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (category.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this category' });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
