// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // ← 追加
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );