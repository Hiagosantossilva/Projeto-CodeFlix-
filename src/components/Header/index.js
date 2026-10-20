import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import useInstallApp from '../../useInstallApp';
import './Header.css';

export default function Header({ black }) {
  const [panel, setPanel] = useState(null);
  const actionsRef = useRef(null);
  const profileRef = useRef(null);
  const installRef = useRef(null);
  const { available, installed, pending, install } = useInstallApp();
  const [reduceMotion, setReduceMotion] = useState(() => {
    try {
      const saved = localStorage.getItem('codeflix-reduce-motion');
      if (saved !== null) return saved === 'true';
    } catch { /* Preferences still work when storage is unavailable. */ }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!panel) return;
    const onPointer = event => {
      if (!actionsRef.current?.contains(event.target)) setPanel(null);
    };
    const onKey = event => {
      if (event.key === 'Escape') {
        setPanel(null);
        (panel === 'profile' ? profileRef : installRef).current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel]);

  function changeMotion(event) {
    setReduceMotion(event.target.checked);
    try { localStorage.setItem('codeflix-reduce-motion', String(event.target.checked)); } catch { /* Optional storage. */ }
  }

  function openInstall() {
    if (available && !installed) {
      setPanel(null);
      install();
    } else {
      setPanel(panel === 'install' ? null : 'install');
    }
  }

  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  return (
    <header className={`site-header${black ? ' black' : ''}`}>
      <a className="header--logo" href="#inicio" aria-label="CodeFlix — início">
        <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="CodeFlix — Hiago Santos Silva, portfólio" width="202" height="45" />
      </a>
      <nav className="header--nav" aria-label="Navegação principal">
        <a className="header--home" href="#inicio">Início</a>
        <a href="#projetos">Projetos</a>
        <a className="header--about" href="#sobre">Sobre</a>
        <a className="header--contact" href="#contato">Contato</a>
      </nav>
      <div className="header--actions" ref={actionsRef} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPanel(null);
      }}>
        <button ref={installRef} type="button" className="header--install" onClick={openInstall}
          aria-label={installed ? 'CodeFlix instalado' : 'Instalar CodeFlix'} title={installed ? 'CodeFlix instalado' : 'Instalar CodeFlix'}
          aria-expanded={panel === 'install'} aria-controls="install-panel" disabled={pending}>
          <Icon name={installed ? 'check' : 'download'} />
        </button>
        <button ref={profileRef} type="button" className="header--user" onClick={() => setPanel(panel === 'profile' ? null : 'profile')}
          aria-label="Perfil e preferências" aria-expanded={panel === 'profile'} aria-controls="profile-panel">
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <circle cx="9" cy="11" r="1.5" fill="currentColor" />
            <circle cx="23" cy="11" r="1.5" fill="currentColor" />
            <path d="M9 21c4 4 10 4 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {panel === 'profile' && <section className="header--panel" id="profile-panel" aria-labelledby="profile-title">
          <p className="header--panel-eyebrow">Seu espaço</p>
          <h2 id="profile-title">Olá, visitante.</h2>
          <p>Conheça os projetos de Hiago Santos Silva e ajuste sua experiência por aqui.</p>
          <div className="header--panel-links">
            <a href="#sobre" onClick={() => setPanel(null)}>Sobre o desenvolvedor <Icon name="right" /></a>
            <a href="https://hiagosantos-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">Portfólio completo <Icon name="external" /><span className="sr-only"> (nova aba)</span></a>
            <a href="mailto:Hiagoss100@outlook.com">Entrar em contato <Icon name="external" /></a>
          </div>
          <label className="header--preference">
            <span>Reduzir animações<small>Uma navegação com menos movimento.</small></span>
            <input type="checkbox" checked={reduceMotion} onChange={changeMotion} />
          </label>
          <small className="header--local-note">Preferência salva neste navegador.</small>
        </section>}
        {panel === 'install' && <section className="header--panel" id="install-panel" aria-labelledby="install-title">
          <p className="header--panel-eyebrow">CodeFlix no seu dispositivo</p>
          <h2 id="install-title">{installed ? 'Pronto para explorar.' : 'CodeFlix, a um toque.'}</h2>
          <p>{installed ? 'Você está usando o CodeFlix como aplicativo.' : 'Adicione o CodeFlix à tela inicial ou ao computador para abrir como um app.'}</p>
          {!installed && <p className="header--install-help">{ios
            ? 'No Safari, toque em Compartilhar e depois em “Adicionar à Tela de Início”.'
            : 'No menu do navegador, procure “Instalar CodeFlix”, “Instalar página como app” ou “Adicionar à tela inicial”. Se a opção não aparecer, tente no Chrome, Edge ou Safari.'}</p>}
        </section>}
      </div>
    </header>
  );
}
