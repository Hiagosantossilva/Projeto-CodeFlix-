import React from 'react';
import './SuiteBadge.css';

export default function SuiteBadge({ item, variant = 'tag' }) {
  if (!item.suite_name) return null;

  return (
    <span
      className={`suite-badge suite-badge--${variant}`}
      title={`Parte do pacote ${item.suite_name}`}
      aria-hidden={variant === 'cover' ? true : undefined}
    >
      <span className="suite-badge--emblem" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <path d="m12 2.5 2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55-4.76-4.64 6.58-.96L12 2.5Z" />
        </svg>
      </span>
      <span>{item.suite_name}</span>
    </span>
  );
}
