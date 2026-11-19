import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Restore deep-link path after static-host 404 redirect (T06 subpath refresh support)
try {
  const redirect = sessionStorage.getItem('biet_spa_redirect');
  if (redirect) {
    sessionStorage.removeItem('biet_spa_redirect');
    const base = import.meta.env.BASE_URL;
    window.history.replaceState(null, '', `${base}${redirect.replace(/^\//, '')}`);
  }
} catch {
  // Ignore sessionStorage restrictions
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
