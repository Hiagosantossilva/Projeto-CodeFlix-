import React from 'react';
import Icon from './Icon';
import { getProjectTitle, getProjectGenres, getProjectYear, resolveAsset, resolveProjectLink, handleImageError } from '../projectUtils';
import './FeaturedMovie.css';

export default function FeaturedMovie({ item, onOpenModal }) {
  const title = getProjectTitle(item);
  const genres = getProjectGenres(item);
  const year = getProjectYear(item);
  const link = resolveProjectLink(item.link);

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
        <p className="featured--kicker">Projeto em destaque</p>
        <h1 className="featured--name" id="featured-title">{title}</h1>
        <div className="featured--info">
          <span>Projeto</span>
          {genres.slice(0, 2).map(genre => <span key={genre}>{genre}</span>)}
          {year && <span>{year}</span>}
        </div>
        <p className="featured--description">{item.overview}</p>
        <div className="featured--buttons">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="button button--primary">
              <Icon name="play" />Abrir projeto<span className="sr-only"> (nova aba)</span>
            </a>
          )}
          <button type="button" className="button button--secondary" onClick={onOpenModal} aria-haspopup="dialog">
            <Icon name="info" />Mais detalhes
          </button>
        </div>
      </div>
    </section>
  );
}
