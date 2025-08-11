import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/common.css';
import { TodoProvider } from './context/TodoContext';
import TodoPage from './pages/TodoPage';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import Completed from './pages/Completed';

// PUBLIC_INTERFACE
export default function App() {
  /** Main application entry wiring routes and global Todo state. */
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}
