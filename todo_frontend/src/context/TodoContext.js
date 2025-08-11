import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todos.v1';

const TodoContext = createContext(undefined);

/**
 * Shape of a Todo:
 * { id: string, title: string, detail: string, completed: boolean, createdAt: string, updatedAt?: string }
 */

// PUBLIC_INTERFACE
export function useTodos() {
  /** Hook to access todo state and actions. */
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function TodoProvider({ children }) {
  /** Provides todo state and CRUD actions backed by localStorage. */
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {
      // ignore
    }
    // Seed with a couple of sample items for first render
    return [
      { id: String(Date.now() - 2), title: 'Welcome to TODO APP', detail: 'Tap + to add more tasks', completed: false, createdAt: new Date().toISOString() },
      { id: String(Date.now() - 1), title: 'Try marking me complete', detail: 'Use the ✓ button on a card', completed: false, createdAt: new Date().toISOString() },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (_) {
      // ignore
    }
  }, [todos]);

  // PUBLIC_INTERFACE
  const addTodo = (title, detail) => {
    /** Add a new todo */
    const now = new Date().toISOString();
    const newTodo = { id: String(Date.now()), title, detail, completed: false, createdAt: now };
    setTodos(prev => [newTodo, ...prev]);
    return newTodo.id;
  };

  // PUBLIC_INTERFACE
  const updateTodo = (id, patch) => {
    /** Update an existing todo with partial fields */
    const now = new Date().toISOString();
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...patch, updatedAt: now } : t)));
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    /** Delete a todo by id */
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    /** Toggle completion state for a todo */
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete,
      completedTodos: todos.filter(t => t.completed),
      activeTodos: todos.filter(t => !t.completed),
    }),
    [todos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
