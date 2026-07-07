const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, categoryController.getCategories);
router.post('/', protect, categoryController.createCategory);
router.put('/:id', protect, categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);

module.exports = router;
