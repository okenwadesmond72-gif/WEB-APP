const Todo = require('../models/Todo');

// Get all todos for a user
exports.getTodos = async (req, res, next) => {
  try {
    const { priority, category, completed } = req.query;
    let query = { userId: req.user.id };

    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (completed !== undefined) query.completed = completed === 'true';

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single todo
exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this todo' });
    }

    res.status(200).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new todo
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, category, dueDate, tags } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a task title' });
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      category,
      dueDate,
      tags,
      userId: req.user.id,
    });

    res.status(201).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this todo' });
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this todo' });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle todo completion
exports.toggleTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to toggle this todo' });
    }

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date() : null;
    await todo.save();

    res.status(200).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get todo statistics
exports.getTodoStats = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    const completed = todos.filter((t) => t.completed).length;
    const active = todos.length - completed;
    const highPriority = todos.filter(
      (t) => t.priority === 'high' && !t.completed
    ).length;

    const stats = {
      total: todos.length,
      completed,
      active,
      highPriority,
      byCategory: {},
      byPriority: {
        low: todos.filter((t) => t.priority === 'low').length,
        medium: todos.filter((t) => t.priority === 'medium').length,
        high: todos.filter((t) => t.priority === 'high').length,
      },
    };

    ['work', 'personal', 'shopping', 'health', 'other'].forEach((cat) => {
      stats.byCategory[cat] = todos.filter((t) => t.category === cat).length;
    });

    res.status(200).json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear completed todos
exports.clearCompleted = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany({
      userId: req.user.id,
      completed: true,
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} completed todos deleted`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search todos
exports.searchTodos = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const todos = await Todo.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ],
    });

    res.status(200).json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
