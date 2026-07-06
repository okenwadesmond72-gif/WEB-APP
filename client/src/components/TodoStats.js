import React from 'react';
import '../styles/TodoStats.css';

function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const highPriority = todos.filter((todo) => todo.priority === 'high' && !todo.completed).length;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{total}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{completed}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🔄</div>
        <div className="stat-content">
          <div className="stat-label">Active</div>
          <div className="stat-value">{active}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🔥</div>
        <div className="stat-content">
          <div className="stat-label">High Priority</div>
          <div className="stat-value">{highPriority}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
