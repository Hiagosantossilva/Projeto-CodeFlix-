import React from 'react';
import './Modal.css';

export default function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.backdrop_path}
          alt={item.title}
          className="modal-backdrop"
        />
        <div className="modal-content">

          {/* ✅ Aviso opcional */}
          {item.warning && (
            <div className="modal-warning">
              ⚠️ {item.warning}
            </div>
          )}

          <h2>{item.title}</h2>
          <p className="modal-description">{item.overview}</p>

          {item.genres && (
            <p className="modal-genres">
              <strong>Gêneros:</strong> {item.genres.join(', ')}
            </p>
          )}

          <div className="modal-buttons">
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Ver Projeto
              </a>
            )}
            <button className="btn-secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
