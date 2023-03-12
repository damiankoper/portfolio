/* eslint-disable @typescript-eslint/no-unused-vars */
import rootMain from '../../../../.storybook/main';
import libConfig from '../vite.config';
import { mergeConfig, UserConfigExport } from 'vite';

export default {
  ...rootMain,
  stories: [
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  async viteFinal(config: UserConfigExport) {
    return mergeConfig(config, libConfig);
  },
};
