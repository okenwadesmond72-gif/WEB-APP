import React, { useState } from 'react';
import { FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import '../styles/TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, { text: editText });
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      work: '💼',
      personal: '👤',
      shopping: '🛒',
      health: '❤️',
      other: '📌',
    };
    return emojis[category] || '📌';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label htmlFor={`todo-${todo.id}`}>
          <FiCheck size={20} />
        </label>
      </div>

      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="todo-edit-input"
            onBlur={handleSaveEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            autoFocus
          />
        ) : (
          <>
            <span className="todo-text">{todo.text}</span>
            <div className="todo-meta">
              <span className={`priority-badge ${getPriorityColor(todo.priority)}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              <span className="category-badge">
                {getCategoryEmoji(todo.category)} {todo.category}
              </span>
              {todo.dueDate && (
                <span className="due-date-badge">
                  📅 {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="todo-actions">
        <button
          className="btn-icon btn-edit"
          onClick={() => setIsEditing(!isEditing)}
          title="Edit"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(todo.id)}
          title="Delete"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
