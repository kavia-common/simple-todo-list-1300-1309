import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AppBar renders the colored top bar with a faux status bar and optional back button.
 * Props:
 * - title: string
 * - showBack?: boolean
 * - className?: string (style scoping: use module class for .appbar container)
 */
// PUBLIC_INTERFACE
export default function AppBar({ title, showBack = false, className = '' }) {
  const navigate = useNavigate();

  const onBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <header className={className} role="banner" aria-label="App Bar">
      <div className="status-bar" aria-hidden="true">
        <div className="time">9:41</div>
        <div className="indicators">
          <span className="icon-bar" style={{ height: 4 }}></span>
          <span className="icon-bar" style={{ height: 8 }}></span>
          <span className="icon-bar" style={{ height: 12 }}></span>
          <span className="icon-dot" style={{ marginLeft: 6 }}></span>
          <span className="icon-battery" style={{ marginLeft: 8 }}></span>
        </div>
      </div>
      {showBack && (
        <button
          className="back-button"
          type="button"
          aria-label="Go back"
          onClick={onBack}
        />
      )}
      <h1 className="appbar-title">{title}</h1>
    </header>
  );
}
