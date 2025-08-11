import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/todo-page.module.css';
import AppBar from '../components/AppBar';
import TodoCard from '../components/TodoCard';
import BottomNav from '../components/BottomNav';
import Fab from '../components/Fab';
import { useTodos } from '../context/TodoContext';

// PUBLIC_INTERFACE
export default function TodoPage() {
  /** TODO PAGE - shows all tasks with edit/delete/complete and filter control. */
  const { todos, deleteTodo, toggleComplete } = useTodos();
  const [mode, setMode] = useState('all');
  const navigate = useNavigate();

  const visibleTodos = useMemo(() => {
    return mode === 'completed' ? todos.filter(t => t.completed) : todos;
  }, [mode, todos]);

  return (
    <div className="center-page">
      <main className={`screen ${styles['todo-page']} phone-shadow`}>
        <AppBar title="TODO APP" className={styles.appbar} showBack={false} />

        {/* Cards */}
        <section className="todos" aria-label="Todos">
          {visibleTodos.slice(0, 5).map((todo, idx) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleComplete}
              indexForPosition={idx + 1}
              classNames={{
                card: `${styles['todo-card']}`,
                'card-1': styles['card-1'],
                'card-2': styles['card-2'],
                'card-3': styles['card-3'],
                'card-4': styles['card-4'],
                'card-5': styles['card-5'],
                complete: styles['is-complete'],
                title: styles['t-title'],
                subtitle: styles['t-subtitle'],
                iconBtn: styles['icon-btn'],
                btnEdit: styles['btn-edit'],
                btnTrash: styles['btn-trash'],
                btnCheck: styles['btn-check'],
              }}
            />
          ))}
          {visibleTodos.length > 5 && visibleTodos.slice(5).map((todo, idx) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleComplete}
              classNames={{
                card: `${styles['todo-card']}`,
                complete: styles['is-complete'],
                title: styles['t-title'],
                subtitle: styles['t-subtitle'],
                iconBtn: styles['icon-btn'],
                btnEdit: styles['btn-edit'],
                btnTrash: styles['btn-trash'],
                btnCheck: styles['btn-check'],
              }}
              // Stack extra cards below the last one
              indexForPosition={undefined}
            />
          ))}
        </section>

        <Fab className={styles.fab} onClick={() => navigate('/add')} />

        <BottomNav
          mode={mode}
          onFilter={setMode}
          className={styles['bottom-nav']}
        />
      </main>
    </div>
  );
}
