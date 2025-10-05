import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header'
import { Widgets } from '@mui/icons-material';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Feartured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChose = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChose];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setBlackHeader(true);
        } else{
          setBlackHeader(false)
        }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }}
  )
  
  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData &&
          <FeaturedMovie item={featuredData}/>
      }

      <section className ="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title ={item.title} items={item.items}/>
        ))}

      </section>
      <footer>
        Feito com <span role="img" arial-label="coração">❤️ por Hiago Santos Silva</span><br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 && 
       <div className="loading">
        <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyeW5mcjk0ajdqYWk1dWZoZzE0ajcwdzdtODk5MmJoenk1a2lkemtzeiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/FgH5xSNjGHZsiYPWAX/giphy.gif" ></img>
      </div>
      
      }
     
    </div>
  );
}
