/* eslint-disable @typescript-eslint/no-unused-vars */
import rootMain from '../../../../.storybook/main';
import libConfig from '../vite.config';
import { mergeConfig, UserConfig } from 'vite';
/* import vue from '@vitejs/plugin-vue';
 */
export default {
  ...rootMain,
  stories: [
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  async viteFinal(config: UserConfig) {
    /* if (config.plugins) {
      const pluginVueIndex = config.plugins.findIndex(
        (c) => c.name === 'vite:vue'
      );
      config.plugins[pluginVueIndex] = vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag: string) =>
              tag.startsWith('Tres') && tag !== 'TresCanvas',
          },
        },
      });
    } */
    return mergeConfig(config, libConfig);
  },
};
