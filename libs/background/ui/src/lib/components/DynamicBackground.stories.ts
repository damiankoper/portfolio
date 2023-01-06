import DynamicBackground from './DynamicBackground.vue';
import { Meta, Story } from '@storybook/vue3';

export default {
  title: 'DynamicBackground',
  component: DynamicBackground,
} as Meta;

export const DynamicBackgroundDevelopment: Story = (args) => ({
  components: { DynamicBackground },
  template: `
  <DynamicBackground
    style="position:fixed;top:0;left:0;height:100vh;width:100vw;"
    v-bind="args"
  />`,
  setup: () => ({ args }),
});
