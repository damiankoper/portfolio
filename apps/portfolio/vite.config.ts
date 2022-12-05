import { fileURLToPath, URL } from 'node:url';
import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [
    vue(),
    vueJsx(),
    ViteTsConfigPathsPlugin({
      root: '../../',
      projects: ['tsconfig.base.json'],
    }),
  ],
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
