const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const { protect } = require('../middleware/auth.middleware');

// Get all todos & stats
router.get('/', protect, todoController.getTodos);
router.get('/stats', protect, todoController.getTodoStats);
router.get('/search', protect, todoController.searchTodos);

// Get single todo
router.get('/:id', protect, todoController.getTodoById);

// Create todo
router.post('/', protect, todoController.createTodo);

// Update todo
router.put('/:id', protect, todoController.updateTodo);

// Toggle todo
router.patch('/:id/toggle', protect, todoController.toggleTodo);

// Delete todo
router.delete('/:id', protect, todoController.deleteTodo);

// Clear completed
router.delete('/completed', protect, todoController.clearCompleted);

module.exports = router;
