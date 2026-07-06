import React, { useState, useEffect } from 'react';
import './styles/App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import FilterButtons from './components/FilterButtons';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './utils/localStorage';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = loadTodosFromLocalStorage();
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  // Add new todo
  const addTodo = (text, priority, category, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit todo
  const editTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  // Filter and search todos
  let filteredTodos = todos;

  if (filter === 'active') {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  }

  if (searchTerm) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Clear all todos
  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all todos?')) {
      setTodos([]);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📋 Professional To-Do List</h1>
          <p>Stay organized and productive</p>
        </div>
      </header>

      <main className="app-main">
        <div className="todo-wrapper">
          {/* Stats Section */}
          <TodoStats todos={todos} />

          {/* Input Section */}
          <TodoForm onAdd={addTodo} />

          {/* Filter Section */}
          <FilterButtons
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Todo List Section */}
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {/* Action Buttons */}
          {todos.length > 0 && (
            <div className="action-buttons">
              {todos.some((todo) => todo.completed) && (
                <button className="btn btn-danger" onClick={clearCompleted}>
                  Clear Completed
                </button>
              )}
              <button className="btn btn-danger btn-dark" onClick={clearAll}>
                Clear All
              </button>
            </div>
          )}

          {/* Empty State */}
          {todos.length === 0 && (
            <div className="empty-state">
              <p>🎉 No todos yet! Add one to get started.</p>
            </div>
          )}

          {filteredTodos.length === 0 && todos.length > 0 && (
            <div className="empty-state">
              <p>No todos match your filter. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ | Local Storage Enabled</p>
      </footer>
    </div>
  );
}

export default App;
