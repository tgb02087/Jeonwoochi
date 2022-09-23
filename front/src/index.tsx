import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './styles/minireset.min.css';
import './styles/fonts.css';

if (process.env.NODE_ENV === 'development') {
  (async () => {
    const { worker } = await import('./mocks/browser');
    worker.start();
  })();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
