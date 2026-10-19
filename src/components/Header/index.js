import React from 'react';
import './Header.css';

export default function Header({ black }) {
  return (
    <header className={`site-header${black ? ' black' : ''}`}>
      <a className="header--logo" href="#inicio" aria-label="CodeFlix — início">
        <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="CodeFlix — Hiago Santos Silva, portfólio" width="202" height="45" />
      </a>
      <nav className="header--nav" aria-label="Navegação principal">
        <a className="header--home" href="#inicio">Início</a>
        <a href="#projetos">Projetos</a>
        <a className="header--about" href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </nav>
      <a className="header--user" href="#sobre" aria-label="Sobre Hiago Santos Silva">
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="23" cy="11" r="1.5" fill="currentColor" />
          <path d="M9 21c4 4 10 4 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </a>
    </header>
  );
}
