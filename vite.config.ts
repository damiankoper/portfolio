/// <reference types="vitest" />

import { defineConfig } from 'vite';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteTsConfigPathsPlugin({
      root: path.resolve('.'),
      projects: ['tsconfig.base.json'],
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
});
