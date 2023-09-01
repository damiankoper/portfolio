import { StorybookConfig } from '@storybook/vue3-vite';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default {
  addons: ['@storybook/addon-essentials', '@storybook/addon-actions'],
  framework: '@storybook/vue3-vite',
  stories: [],
  previewHead(config, options) {
    const head = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), 'preview-head.html'),
    );
    return config + head;
  },
} satisfies StorybookConfig;
