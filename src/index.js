import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Keep development free from cached bundles; enable the app shell in production.
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  const register = () => navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/service-worker.js`)
    .catch(error => console.warn('CodeFlix: não foi possível preparar o modo offline.', error));
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
