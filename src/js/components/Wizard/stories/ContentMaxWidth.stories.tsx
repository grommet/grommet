// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Box, FormField, Paragraph, TextInput, Wizard } from 'grommet';

type StoryArgs = Pick<
  React.ComponentProps<typeof Wizard>,
  'contentMaxWidth' | 'showProgress'
> & { full: boolean };

const steps = [
  {
    id: 'details',
    title: 'Details',
    render: () => (
      <Box gap="medium">
        <FormField name="name" label="Name" htmlFor="resource-name" required>
          <TextInput id="resource-name" name="name" />
        </FormField>
        <FormField
          name="description"
          label="Description"
          htmlFor="resource-description"
        >
          <TextInput id="resource-description" name="description" />
        </FormField>
        {Array.from({ length: 16 }, (_, index) => (
          <Paragraph key={`requirement-${index}`} fill>
            Resource requirement {index + 1}: Review the account details, access
            permissions, and configuration before continuing.
          </Paragraph>
        ))}
      </Box>
    ),
  },
  {
    id: 'configure',
    title: 'Configure',
    render: () => (
      <FormField name="region" label="Region" htmlFor="resource-region">
        <TextInput id="resource-region" name="region" />
      </FormField>
    ),
  },
  {
    id: 'review',
    title: 'Review',
    render: () => <Paragraph>Confirm the resource configuration.</Paragraph>,
  },
];

export const ContentMaxWidth: StoryObj<StoryArgs> = {
  args: {
    full: true,
    contentMaxWidth: 'xlarge',
    showProgress: 'horizontal',
  },
  render: ({ contentMaxWidth, showProgress }) => (
    <Box fill>
      <Wizard
        title="Create resource"
        aria-label="Create resource"
        steps={steps}
        contentMaxWidth={contentMaxWidth}
        showProgress={showProgress}
      />
    </Box>
  ),
};

export default {
  title: 'Layout/Wizard/Content Max Width',
  argTypes: {
    contentMaxWidth: {
      control: 'select',
      options: ['Unconstrained', 'medium', 'large', 'xlarge', '48rem'],
      mapping: { Unconstrained: undefined },
      description:
        'Maximum width of the middle, including progress, and footer content. ' +
        'Both fill available space up to this limit. The header stays full ' +
        'width, as does the footer background. Custom children are ' +
        'unaffected. No hug sizing mode.',
    },
    showProgress: {
      control: 'select',
      options: ['horizontal', 'vertical', 'None'],
      mapping: { None: false },
    },
  },
};
