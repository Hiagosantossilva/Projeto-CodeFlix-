import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Modal from './components/Modal';

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // ✅ Adicionado

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o destaque
      let principais = list.filter(i => i.slug === 'principais');
      if (principais.length > 0 && principais[0].items.results.length > 0) {
        let randomChose = Math.floor(
          Math.random() * (principais[0].items.results.length - 1)
        );
        let chosen = principais[0].items.results[randomChose];

        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      setBlackHeader(window.scrollY > 10);
    };
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && (
        <FeaturedMovie
          item={featuredData}
          onOpenModal={() => setSelectedItem(featuredData)} // ✅ botão "Ver Mais"
        />
      )}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
            onSelect={(data) => setSelectedItem(data)} // ✅ abre o modal
          />
        ))}
      </section>

      <footer>
        Feito por Hiago Santos Silva
      </footer>

      {/* ✅ Exibe o modal global se houver item selecionado */}
      {selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Tela de loading */}
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyeW5mcjk0ajdqYWk1dWZoZzE0ajcwdzdtODk5MmJoenk1a2lkemtzeiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/FgH5xSNjGHZsiYPWAX/giphy.gif"
            alt="Carregando..."
          />
        </div>
      )}
    </div>
  );
}
