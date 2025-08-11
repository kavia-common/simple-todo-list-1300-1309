import React from 'react';

// PUBLIC_INTERFACE
export default function Fab({ className = '', onClick }) {
  /** Floating Action Button showing a plus sign using CSS ::before/::after */
  return <button className={className} type="button" aria-label="Add new todo" onClick={onClick}></button>;
}
