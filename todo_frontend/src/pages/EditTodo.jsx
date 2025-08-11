import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/edit-todo.module.css';
import AppBar from '../components/AppBar';
import { useTodos } from '../context/TodoContext';

// PUBLIC_INTERFACE
export default function EditTodo() {
  /** EDIT TODO screen allowing update of an existing task */
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo } = useTodos();

  const current = useMemo(() => todos.find(t => t.id === id), [todos, id]);

  const [title, setTitle] = useState(current?.title ?? '');
  const [detail, setDetail] = useState(current?.detail ?? '');
  const [submitting, setSubmitting] = useState(false);

  const handleUpdate = () => {
    if (!current) {
      alert('Task not found.');
      navigate('/');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      updateTodo(current.id, { title: title.trim(), detail: detail.trim() });
      setSubmitting(false);
      navigate('/');
    }, 300);
  };

  const handleCancel = () => {
    if (title !== (current?.title ?? '') || detail !== (current?.detail ?? '')) {
      const ok = window.confirm('Discard changes?');
      if (!ok) return;
    }
    navigate(-1);
  };

  return (
    <div className="center-page">
      <main className={`screen ${styles['edit-todo']} phone-shadow`} role="main" aria-label="Edit Todo Screen">
        <AppBar title="Edit Task" className={styles.appbar} showBack />

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
            className={`btn ${styles['btn-update']}`}
            type="button"
            onClick={handleUpdate}
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update'}
          </button>
          <button
            className={`btn ${styles['btn-cancel']}`}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
