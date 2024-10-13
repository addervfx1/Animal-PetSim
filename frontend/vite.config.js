// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: '../dist',
  },
});
