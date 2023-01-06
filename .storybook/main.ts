import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig } from 'vite';
import baseConfig from '../vite.config';

export const rootMain: StorybookViteConfig = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  async viteFinal(config) {
    return mergeConfig(config, baseConfig);
  },
};
