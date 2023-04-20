// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [viteTsConfigPaths({ root: '../../../' }), vuetify()],
});
