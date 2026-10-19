import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Modal from './components/Modal';
import About from './components/About';
import './App.css';

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    Tmdb.getHomeList().then(list => {
      if (!active) return;
      setMovieList(list);
      const projects = list.find(row => row.slug === 'principais')?.items.results || [];
      // Legacy IDs repeat across categories; keep the selected record itself.
      setFeaturedData(projects[Math.floor(Math.random() * projects.length)] || null);
    }).catch(() => {
      if (active) setLoadError(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const onScroll = () => setBlackHeader(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page" id="inicio">
      <a className="skip-link" href="#projetos">Pular para os projetos</a>
      <Header black={blackHeader} />
      <main id="conteudo">
        {featuredData && <FeaturedMovie item={featuredData} onOpenModal={() => setSelectedItem(featuredData)} />}
        <div className="lists" id="projetos" aria-label="Catálogo de projetos" tabIndex={-1}>
          {movieList.map(item => <MovieRow key={item.slug} title={item.title} items={item.items} onSelect={setSelectedItem} />)}
        </div>
        {movieList.length > 0 && <About />}
        {movieList.length === 0 && (
          <div className="loading" role="status">
            {loadError ? <p>Não foi possível carregar os projetos. Atualize a página para tentar novamente.</p> : <><span className="loading--spinner" /><p>Preparando os projetos…</p></>}
          </div>
        )}
      </main>
      <footer className="site-footer" id="contato">
        <div>
          <a className="footer--brand" href="#inicio">CODE<span>FLIX</span></a>
          <p>Projetos, estudos e ideias que viraram código.</p>
        </div>
        <div className="footer--contact">
          <p>Desenvolvido por <strong>Hiago Santos Silva</strong></p>
          <a href="mailto:Hiagoss100@outlook.com">Hiagoss100@outlook.com</a>
          <a href="tel:+5511963146071">(11) 96314-6071</a>
        </div>
      </footer>
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
