import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export const config = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});

export {};
