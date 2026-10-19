import React, { useEffect, useRef, useId } from 'react';
import Icon from './Icon';
import ProjectBrand from './ProjectBrand';
import SuiteBadge from './SuiteBadge';
import { getProjectTitle, getProjectGenres, getProjectYear, resolveAsset, resolveProjectLink, handleImageError } from '../projectUtils';
import './Modal.css';

export default function Modal({ item, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const title = getProjectTitle(item);
  const genres = getProjectGenres(item);
  const year = getProjectYear(item);
  const link = resolveProjectLink(item.link);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const outsideDialog = event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
    if (outsideDialog) onClose();
  }

  function handleCancel(event) {
    event.preventDefault();
    onClose();
  }

  function handleKeyDown(event) {
    if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return;
    const controls = event.currentTarget.querySelectorAll('button:not([disabled]), a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal-container"
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      onKeyDown={handleKeyDown}
    >
      <div className="modal--closebar">
        <button type="button" className="modal--close" onClick={onClose} aria-label="Fechar detalhes" autoFocus>
          <Icon name="close" />
        </button>
      </div>
      <div className="modal-hero">
        <SuiteBadge item={item} variant="cover" />
        <img
          src={resolveAsset(item.backdrop_path || item.poster_path)}
          alt=""
          className="modal-backdrop"
          onError={handleImageError}
        />
        <div className="modal-hero--content">
          <ProjectBrand item={item} variant="modal" />
          <h2 id={titleId}>{title}</h2>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="button button--primary">
              <Icon name="play" />Abrir projeto<span className="sr-only"> (nova aba)</span>
            </a>
          )}
        </div>
      </div>
      <div className={`modal-content${genres.length || item.suite_name ? '' : ' modal-content--single'}`}>
        <div className="modal-summary">
          <p className="modal-meta">{year && <span>{year}</span>}<span>Projeto</span></p>
          {item.warning && (
            <p className="modal-warning"><Icon name="info" /><span>{item.warning}</span></p>
          )}
          <p className="modal-description">{item.overview}</p>
          <button type="button" className="modal-return" onClick={onClose}>Voltar ao catálogo</button>
        </div>
        {(genres.length > 0 || item.suite_name) && (
          <div className="modal-facts">
            {genres.length > 0 && (
              <p><span className="modal-facts--label">Tecnologias e categorias: </span>{genres.join(', ')}</p>
            )}
            {item.suite_name && (
              <p className="modal-suite"><span className="modal-facts--label">Pacote:</span><SuiteBadge item={item} /></p>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}
