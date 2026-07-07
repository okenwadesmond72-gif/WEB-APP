require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todos', require('./routes/todo.routes'));
app.use('/api/categories', require('./routes/category.routes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
