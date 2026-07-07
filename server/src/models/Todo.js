const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: {
      type: String,
      enum: ['work', 'personal', 'shopping', 'health', 'other'],
      default: 'personal',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
