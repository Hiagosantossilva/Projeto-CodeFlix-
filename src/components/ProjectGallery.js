import React, { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon';
import { handleImageError, resolveAsset } from '../projectUtils';
import './ProjectGallery.css';

export default function ProjectGallery({ title, titleId, images }) {
  const [active, setActive] = useState(0);
  const thumbnailsRef = useRef(null);
  const captionId = useId();
  const helpId = useId();
  const current = images[active];

  useEffect(() => {
    const strip = thumbnailsRef.current;
    const selected = strip?.children[active];
    if (selected) strip.scrollTo({ left: selected.offsetLeft - strip.clientWidth / 2 + selected.clientWidth / 2, behavior: 'instant' });
  }, [active]);

  function change(direction) {
    setActive(index => (index + direction + images.length) % images.length);
  }

  function handleKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      change(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  if (!current) return null;

  return (
    <section className="project-gallery" aria-label={`Galeria de ${title}`} onKeyDown={handleKeyDown}>
      <div className="project-gallery--heading">
        <p>Galeria do projeto</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      <figure className="project-gallery--figure">
        <div className="project-gallery--stage" tabIndex={0} role="group" aria-label="Visualizador de capturas" aria-describedby={helpId}>
          <img src={resolveAsset(current.src)} alt={current.alt || `${title}: ${current.caption || `captura ${active + 1}`}`} onError={handleImageError} />
          {images.length > 1 && <>
            <button type="button" className="project-gallery--arrow project-gallery--previous" onClick={() => change(-1)} aria-label="Captura anterior"><Icon name="left" /></button>
            <button type="button" className="project-gallery--arrow project-gallery--next" onClick={() => change(1)} aria-label="Próxima captura"><Icon name="right" /></button>
          </>}
        </div>
        <figcaption id={captionId} className="project-gallery--caption" aria-live="polite" aria-atomic="true">
          <span>{current.caption || `Captura ${active + 1}`}</span>
          <span className="project-gallery--count">{active + 1} de {images.length}</span>
        </figcaption>
      </figure>
      <p id={helpId} className="sr-only">Use as setas para a esquerda e para a direita ou escolha uma miniatura para trocar a captura.</p>
      {images.length > 1 && <div className="project-gallery--thumbnails" ref={thumbnailsRef} aria-label="Escolher uma captura">
        {images.map((image, index) => <button key={image.src} type="button" onClick={() => setActive(index)} aria-pressed={active === index}
          aria-label={`Ver captura ${index + 1}: ${image.caption || title}`} aria-describedby={active === index ? captionId : undefined}>
          <img src={resolveAsset(image.src)} alt="" loading="lazy" onError={handleImageError} />
        </button>)}
      </div>}
    </section>
  );
}
