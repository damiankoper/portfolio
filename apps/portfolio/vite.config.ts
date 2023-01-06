import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [vue(), vueJsx()],
});
