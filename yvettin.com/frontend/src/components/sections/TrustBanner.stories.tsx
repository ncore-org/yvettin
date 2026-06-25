import type { Meta, StoryObj } from '@storybook/react';
import TrustBanner from './TrustBanner';

const meta: Meta<typeof TrustBanner> = {
  title: 'Sections/TrustBanner',
  component: TrustBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TrustBanner>;

export const Default: Story = {
  args: {},
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
