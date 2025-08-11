import React from 'react';

/**
 * BottomNav renders the All/Completed filter bar.
 * Props:
 * - mode: 'all' | 'completed'
 * - onFilter(mode): function
 * - className: string (module class for .bottom-nav)
 */
// PUBLIC_INTERFACE
export default function BottomNav({ mode = 'all', onFilter, className }) {
  const isCompleted = mode === 'completed';

  return (
    <nav
      className={`${className} ${isCompleted ? 'is-completed' : ''}`}
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div
        className="icon-playlist"
        role="button"
        tabIndex={0}
        aria-label="Filter All"
        onClick={() => onFilter('all')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFilter('all')}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div
        className="icon-tick"
        role="button"
        tabIndex={0}
        aria-label="Filter Completed"
        onClick={() => onFilter('completed')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFilter('completed')}
      >
        ✓
      </div>
      <div className="label label-all" onClick={() => onFilter('all')}>All</div>
      <div className="label label-completed" onClick={() => onFilter('completed')}>Completed</div>
    </nav>
  );
}
