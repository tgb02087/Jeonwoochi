import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './styles/minireset.min.css';
import './styles/fonts.css';
import axios from 'axios';

// if (process.env.NODE_ENV === 'development') {
//   (async () => {
//     const { worker } = await import('./mocks/browser');
//     worker.start();
//   })();
// }

axios.defaults.baseURL = 'https://j7b305.p.ssafy.io/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
