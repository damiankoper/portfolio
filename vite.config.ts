/// <reference types="vitest" />

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {},
  test: {
    environment: 'happy-dom',
  },
});
