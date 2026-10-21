import React from 'react';
import Icon from './Icon';
import ProjectBrand from './ProjectBrand';
import SuiteBadge from './SuiteBadge';
import { getProjectTitle, getProjectGenres, getProjectYear, getProjectGallery, getProjectLink, getProjectTypeLabel, resolveAsset, handleImageError } from '../projectUtils';
import './FeaturedMovie.css';

export default function FeaturedMovie({ item, onOpenModal }) {
  const title = getProjectTitle(item);
  const genres = getProjectGenres(item);
  const year = getProjectYear(item);
  const gallery = getProjectGallery(item);
  const link = getProjectLink(item);

  return (
    <section className="featured" aria-labelledby="featured-title">
      <img
        className="featured--backdrop"
        src={resolveAsset(item.backdrop_path || item.poster_path)}
        onError={handleImageError}
        alt=""
        fetchPriority="high"
      />
      <div className="featured--content">
        <p className="featured--kicker">
          <span>Projeto em destaque</span>
          <SuiteBadge item={item} />
        </p>
        <ProjectBrand item={item} variant="featured" />
        <h1 className="featured--name" id="featured-title">{title}</h1>
        <div className="featured--info">
          <span>{getProjectTypeLabel(item)}</span>
          {genres.slice(0, 2).map(genre => <span key={genre}>{genre}</span>)}
          {year && <span>{year}</span>}
        </div>
        <p className="featured--description">{item.overview}</p>
        <div className="featured--buttons">
          {gallery.length > 0 && <button type="button" className="button button--primary" onClick={onOpenModal} aria-haspopup="dialog"><Icon name="gallery" />Ver galeria</button>}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="button button--primary">
              <Icon name="play" />Abrir projeto<span className="sr-only"> (nova aba)</span>
            </a>
          )}
          {!gallery.length && <button type="button" className="button button--secondary" onClick={onOpenModal} aria-haspopup="dialog">
            <Icon name="info" />Mais detalhes
          </button>}
        </div>
      </div>
    </section>
  );
}
