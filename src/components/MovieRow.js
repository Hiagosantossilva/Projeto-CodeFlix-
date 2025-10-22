import React, { useState } from 'react';
import './MovieRow.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function MovieRow({ title, items, onSelect }) {
  const [scrollX, setScrollX] = useState(0);

  const results = items?.results ?? [];
  const itemWidth = 150;
  const listW = results.length * itemWidth;

  const resolvePoster = (poster, fallbackBackdrop) => {
    const p = poster || fallbackBackdrop;
    if (!p) return '/placeholder.png';
    if (p.startsWith('http') || p.startsWith('/')) return p;
    return `https://image.tmdb.org/t/p/w300${p}`;
  };

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) x = 0;
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const maxX = (window.innerWidth - listW) - 60;
    if (x < maxX) x = maxX;
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div
        className="movieRow--left"
        onClick={handleLeftArrow}
        role="button"
        aria-label="voltar"
      >
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>

      <div
        className="movieRow--right"
        onClick={handleRightArrow}
        role="button"
        aria-label="avançar"
      >
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{ marginLeft: scrollX, width: listW }}
        >
          {results.map((item) => (
            <div
              className="movieRow--item"
              key={item.id}
              onClick={() => onSelect(item)} // Abre pop-up
            >
              <img
                src={resolvePoster(item.poster_path, item.backdrop_path)}
                alt={item.title || item.name || 'Poster'}
                loading="lazy"
              />
              <div className="titulo">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
