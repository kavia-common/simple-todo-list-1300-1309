import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * TodoCard displays an individual todo and handles edit/delete/complete actions.
 * Props:
 * - todo: { id, title, detail, completed }
 * - onDelete(id)
 * - onToggle(id)
 * - indexForPosition?: number (1-5) applies card-N class for absolute positions
 * - classNames: { card, title, subtitle, iconBtn, btnEdit, btnTrash, btnCheck, complete?, [card-1..card-5]? }
 */
// PUBLIC_INTERFACE
export default function TodoCard({
  todo,
  onDelete,
  onToggle,
  indexForPosition,
  classNames
}) {
  const navigate = useNavigate();
  const cardClasses = [classNames.card];
  if (indexForPosition && indexForPosition >= 1 && indexForPosition <= 5) {
    cardClasses.push(classNames[`card-${indexForPosition}`]);
  }
  if (todo.completed) {
    // Use module-scoped class for completed state if provided
    if (classNames.complete) cardClasses.push(classNames.complete);
    else cardClasses.push('is-complete');
  }

  return (
    <article className={cardClasses.join(' ')} role="article" aria-label={`Todo ${todo.title}`}>
      <h2 className={classNames.title}>{todo.title || 'Untitled'}</h2>
      <p className={classNames.subtitle}>{todo.detail || ''}</p>

      <button
        className={`${classNames.iconBtn} ${classNames.btnEdit}`}
        data-action="edit"
        aria-label="Edit todo"
        onClick={() => navigate(`/edit/${todo.id}`)}
      >
        ✎
      </button>
      <button
        className={`${classNames.iconBtn} ${classNames.btnTrash}`}
        data-action="delete"
        aria-label="Delete todo"
        onClick={() => onDelete(todo.id)}
      >
        🗑
      </button>
      <button
        className={`${classNames.iconBtn} ${classNames.btnCheck}`}
        data-action="toggle-complete"
        aria-label="Mark complete"
        aria-pressed={todo.completed ? 'true' : 'false'}
        onClick={() => onToggle(todo.id)}
      >
        ✓
      </button>
    </article>
  );
}
