import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Add these critical configurations:
  base: '/Chatbot/', // Relative paths for GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './src/main.jsx' // Explicit entry point
      }
    }
  },
  server: {
    open: true // Auto-open browser on dev start
  }
});