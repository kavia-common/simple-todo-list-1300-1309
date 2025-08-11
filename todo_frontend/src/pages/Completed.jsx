import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/completed-task.module.css';
import AppBar from '../components/AppBar';
import { useTodos } from '../context/TodoContext';

// PUBLIC_INTERFACE
export default function Completed() {
  /** COMPLETED TASK screen listing completed tasks as styled cards */
  const { completedTodos } = useTodos();
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <main className={`screen ${styles['completed-task']} phone-shadow`} role="main" aria-label="Completed Task Screen">
        <AppBar title="Completed Task" className={styles.appbar} showBack />

        <section className="todos" aria-label="Completed Tasks">
          {completedTodos.slice(0, 3).map((todo, idx) => (
            <article
              key={todo.id}
              className={`${styles['todo-card']} ${styles[`card-${idx + 1}`]}`}
              role="article"
              aria-label={`Completed Todo ${idx + 1}`}
              onClick={() => navigate(`/edit/${todo.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h2 className={styles['t-title']}>{todo.title}</h2>
              <p className={styles['t-subtitle']}>{todo.detail}</p>
            </article>
          ))}
          {completedTodos.length === 0 && (
            <div style={{ position: 'absolute', top: 160, left: 20, right: 20, color: '#555' }}>
              No completed tasks yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
