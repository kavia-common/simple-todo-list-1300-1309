import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/add-todo.module.css';
import AppBar from '../components/AppBar';
import { useTodos } from '../context/TodoContext';

// PUBLIC_INTERFACE
export default function AddTodo() {
  /** ADD TODO screen allowing user to create a task */
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addTodo } = useTodos();
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title.trim()) {
      alert('Please enter a title for the task.');
      return;
    }
    setSubmitting(true);
    // Simulate brief latency
    setTimeout(() => {
      addTodo(title.trim(), detail.trim());
      setSubmitting(false);
      navigate('/');
    }, 300);
  };

  return (
    <div className="center-page">
      <main className={`screen ${styles['add-todo']} phone-shadow`} role="main" aria-label="Add Todo Screen">
        <AppBar title="Add Task" className={styles.appbar} showBack />

        <label className={styles['field-title-label']} htmlFor="todo-title">Title</label>
        <div className={styles['field-title-input']}>
          <input
            id="todo-title"
            className="input-underline"
            type="text"
            name="title"
            placeholder="Enter todo title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <label className={styles['field-detail-label']} htmlFor="todo-detail">Detail</label>
        <div className={styles['field-detail-input']}>
          <input
            id="todo-detail"
            className="input-underline"
            type="text"
            name="detail"
            placeholder="Enter todo detail"
            autoComplete="off"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <div className="actions" role="group" aria-label="Actions">
          <button
            className={`btn btn-lg ${styles['btn-add']}`}
            type="button"
            onClick={handleAdd}
            disabled={submitting}
          >
            {submitting ? 'Adding...' : 'ADD'}
          </button>
        </div>
      </main>
    </div>
  );
}
