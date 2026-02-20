import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        dashboard: './dashboard.html',
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
});
