import React from 'react';
import Icon from './Icon';
import './About.css';

export default function About() {
  return (
    <section className="portfolio-about" id="sobre" aria-labelledby="about-title">
      <div className="portfolio-about--heading">
        <p className="eyebrow">Sobre este portfólio</p>
        <h2 id="about-title">Hiago Santos Silva</h2>
        <p className="portfolio-about--areas">Desenvolvimento, dados e design.</p>
      </div>
      <div className="portfolio-about--content">
        <p>
          Sou estudante de Ciência da Computação na Faculdade Impacta, com experiência
          em desenvolvimento Full Stack e design. Atualmente, faço estágio em
          Engenharia de Dados no Bradesco, trabalhando com Databricks e PySpark.
        </p>
        <p>
          O CodeFlix é meu portfólio de projetos básicos: reúne estudos, experimentos
          e aplicações que fazem parte da minha evolução como desenvolvedor.
        </p>
        <a
          className="portfolio-about--link"
          href="https://hiagosantos-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conheça meu portfólio completo
          <Icon name="external" />
          <span className="sr-only"> (nova aba)</span>
        </a>
      </div>
    </section>
  );
}
