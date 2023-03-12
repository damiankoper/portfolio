// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [viteTsConfigPaths({ root: '../../../' })],
});
