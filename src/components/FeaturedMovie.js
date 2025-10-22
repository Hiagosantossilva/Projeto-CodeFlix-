import React from 'react';
import './FeaturedMovie.css';

export default function FeaturedMovie({ item = {}, onOpenModal }) {
  const title =
    item.original_name || item.name || item.original_title || item.title || 'Sem título';

  const dateStr = item.first_air_date || item.release_date || '';
  const firstDate = dateStr ? new Date(dateStr) : null;
  const year = firstDate ? firstDate.getFullYear() : '—';

  const genresList = Array.isArray(item.genres)
    ? item.genres.map(g => (typeof g === 'string' ? g : g?.name)).filter(Boolean)
    : [];
  const genres = genresList.join(', ');

  let description = item.overview || '';
  if (description.length > 200) description = description.substring(0, 200) + '...';

  const points = typeof item.vote_average === 'number' ? item.vote_average : '—';
  const seasons = typeof item.number_of_seasons === 'number' ? item.number_of_seasons : null;

  const resolveBackdrop = (backdrop_path) => {
  if (!backdrop_path) return undefined;

  // Se for imagem local do public/
  if (backdrop_path.startsWith('/')) return process.env.PUBLIC_URL + backdrop_path;

  // Caminho relativo (sem http)
  if (!backdrop_path.startsWith('http')) return process.env.PUBLIC_URL + '/' + backdrop_path;

  // URL externa completa
  return backdrop_path;
};

  const backdropUrl = resolveBackdrop(item.backdrop_path);

  return (
    <section
      className="featured"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        ...(backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {})
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{title}</div>

          <div className="featured--info">
            <div className="featured--points">{points} pontos</div>
            <div className="featured--year">{year}</div>
            {seasons != null && (
              <div className="featured--seasons">
                {seasons} temporada{seasons !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          <div className="featured--description">{description}</div>

          <div className="featured--buttons">
            <a href={`${item.link}`} target="_blank" className="featured--watchbutton"> ▶ Abrir Projeto </a>
            <a className="featured--mylistbutton" onClick={() => onOpenModal(item)}>✚ Mais detalhes </a>
          </div>

          {genres && (
            <div className="featured--genres"><strong>Gêneros: </strong>{genres}</div>
          )}
        </div>
      </div>
    </section>
  );
}
