import React from 'react';
import ReactDOM from 'react-dom/client';
import { BackendProvider } from './contexts/BackendContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BackendProvider>
      <App />
    </BackendProvider>
  </React.StrictMode>,
);
