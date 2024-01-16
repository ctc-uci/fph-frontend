import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BackendProvider } from './contexts/BackendContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BackendProvider>
        <App />
    </BackendProvider>
  </React.StrictMode>,
);
