import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 開発中
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
