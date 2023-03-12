import DynamicBackground from './DynamicBackground.vue';
import { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  component: DynamicBackground,
  decorators: [
    () => ({
      template: '<div style="height:100vh"><story/></div>',
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DynamicBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
