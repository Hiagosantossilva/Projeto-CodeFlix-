import React, { useRef, useState, useEffect, useId } from 'react';
import Icon from './Icon';
import ProjectBrand from './ProjectBrand';
import SuiteBadge from './SuiteBadge';
import { getProjectTitle, resolveAsset, handleImageError } from '../projectUtils';
import './MovieRow.css';

export default function MovieRow({ title, items, onSelect }) {
  const listRef = useRef(null);
  const headingId = useId();
  const listId = useId();
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const results = items?.results ?? [];

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => setCanScroll({
      left: list.scrollLeft > 2,
      right: list.scrollLeft + list.clientWidth < list.scrollWidth - 2,
    });
    update();
    list.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => {
      list.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [items]);

  function scroll(direction) {
    const list = listRef.current;
    if (list) list.scrollBy({
      left: direction * list.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.reduceMotion === 'true' ? 'instant' : 'smooth',
    });
  }

  if (results.length === 0) return null;

  return (
    <section className="movieRow" aria-labelledby={headingId}>
      <div className="movieRow--heading">
        <div className="movieRow--title">
          <h2 id={headingId}>{title}</h2>
          <span className="sr-only">{results.length} {results.length === 1 ? 'projeto' : 'projetos'}</span>
        </div>
      </div>
      <div className="movieRow--carousel">
        <div className="movieRow--controls">
          <button type="button" className="movieRow--arrow movieRow--arrow-left" onClick={() => scroll(-1)} disabled={!canScroll.left} aria-label={`Voltar em ${title}`} aria-controls={listId}>
            <Icon name="left" />
          </button>
          <button type="button" className="movieRow--arrow movieRow--arrow-right" onClick={() => scroll(1)} disabled={!canScroll.right} aria-label={`Avançar em ${title}`} aria-controls={listId}>
            <Icon name="right" />
          </button>
        </div>
        <ul className="movieRow--list" ref={listRef} id={listId} tabIndex={0} aria-label={`Projetos de ${title}`}>
          {results.map(item => {
            const projectTitle = getProjectTitle(item);
            return (
              <li className="movieRow--item" key={`${projectTitle}-${item.poster_path}`}>
                <button type="button" className="project-card" onClick={() => onSelect(item)} aria-label={`Ver detalhes de ${projectTitle}${item.suite_name ? `. Pacote ${item.suite_name}` : ''}`} aria-haspopup="dialog">
                  <span className={`project-card--cover${item.logo_path ? ' project-card--cover-branded' : ''}`}>
                    <img src={resolveAsset(item.backdrop_path || item.poster_path)} alt="" loading="lazy" decoding="async" onError={handleImageError} />
                    <ProjectBrand item={item} />
                    <SuiteBadge item={item} variant="cover" />
                    <span className="project-card--overlay"><Icon name="info" /></span>
                  </span>
                  <span className="project-card--title">{projectTitle}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
