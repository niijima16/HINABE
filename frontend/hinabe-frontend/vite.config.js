// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [ react() ],
  server: {
    host: true,      // LANアクセスを許可 (すでに使っているなら省略可)
    port: 5173,
    proxy: {
      // フロントから /api へ来たら……
      '/api': {
        target: 'http://127.0.0.1:8000',  // Django 開発サーバーのアドレス
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        // → 実際には http://127.0.0.1:8000/api/… に飛ぶ
      },
    },
  },
});