import DynamicBackground from './DynamicBackground.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ref, onMounted } from 'vue';
const meta = {
  component: DynamicBackground,
  decorators: [],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DynamicBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => ({
    components: { DynamicBackground },
    template: `
      <div style="height:400vh;padding:0px">
        <DynamicBackground :progress="progress" :scroll="scroll"/>
      </div>
    `,
    setup() {
      const scroll = ref(0);
      const progress = ref(0);
      onMounted(() => {
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          const height = window.innerHeight;
          const bodyRect = document.body.getBoundingClientRect();

          progress.value = -scrollY / (height - bodyRect.height);
          scroll.value = scrollY;
        });
      });
      return { scroll, progress };
    },
  }),
};
