// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Grommet, Heading, Stepper } from 'grommet';
import type { StepType, ThemeType } from 'grommet';
import { Checkmark, CircleInformation, StatusCritical } from 'grommet-icons';

const customTheme = {
  stepper: {
    container: {
      background: '#F5F3FF',
      border: { color: '#DDD6FE', size: '1px' },
      gap: { row: 'medium', column: 'large' },
      pad: 'medium',
      round: 'medium',
    },
    button: {
      gap: 'small',
      pad: 'xsmall',
    },
    indicator: {
      align: 'center',
      background: '#FFFFFF',
      border: { color: '#A78BFA', size: '2px' },
      iconSize: 'small',
      justify: 'center',
      round: 'full',
      size: '48px',
    },
    label: {
      color: '#312E81',
      size: 'medium',
      weight: 600,
    },
    description: {
      color: '#6B7280',
      size: 'small',
    },
    errorText: {
      color: '#B91C1C',
      size: 'small',
      weight: 600,
    },
    disabledReason: {
      color: '#6B7280',
      size: 'small',
    },
    connector: {
      color: '#C4B5FD',
      thickness: '3px',
    },
    children: {
      gap: 'small',
      pad: { left: 'medium' },
    },
    hover: {
      indicator: {
        background: '#EDE9FE',
        border: { color: '#6D28D9' },
      },
      label: {
        color: '#6D28D9',
        weight: 700,
      },
    },
    pending: {
      indicator: {
        background: '#FFFFFF',
        border: { color: '#A78BFA' },
      },
    },
    current: {
      indicator: {
        icon: CircleInformation,
        background: '#6D28D9',
        border: { color: '#6D28D9' },
        color: '#FFFFFF',
      },
      label: {
        color: '#5B21B6',
      },
      connector: {
        color: '#7C3AED',
      },
      hover: {
        indicator: {
          background: '#5B21B6',
          border: { color: '#5B21B6' },
        },
      },
    },
    currentCompleted: {
      indicator: {
        icon: Checkmark,
        background: '#047857',
        border: { color: '#047857' },
        color: '#FFFFFF',
      },
      label: {
        color: '#047857',
      },
      connector: {
        color: '#059669',
      },
    },
    completed: {
      indicator: {
        icon: Checkmark,
        background: '#D1FAE5',
        border: { color: '#059669' },
        color: '#047857',
      },
      label: {
        color: '#047857',
      },
      connector: {
        color: '#059669',
        thickness: '4px',
      },
    },
    error: {
      indicator: {
        icon: StatusCritical,
        background: '#FEF2F2',
        border: { color: '#DC2626' },
        color: '#B91C1C',
      },
      label: {
        color: '#B91C1C',
      },
      connector: {
        color: '#FCA5A5',
      },
      hover: {
        indicator: {
          background: '#FEE2E2',
          border: { color: '#B91C1C' },
        },
      },
    },
    currentError: {
      indicator: {
        icon: StatusCritical,
        background: '#B91C1C',
        border: { color: '#B91C1C' },
        color: '#FFFFFF',
      },
      label: {
        color: '#B91C1C',
      },
      description: {
        color: '#7F1D1D',
      },
      connector: {
        color: '#DC2626',
      },
    },
    disabled: {
      indicator: {
        background: '#F3F4F6',
        border: { color: '#D1D5DB' },
        color: '#9CA3AF',
      },
      label: {
        color: '#6B7280',
      },
      connector: {
        color: '#D1D5DB',
      },
    },
    vertical: {
      button: {
        gap: 'medium',
      },
      connector: {
        color: '#C4B5FD',
        thickness: '2px',
      },
    },
    subStep: {
      button: {
        gap: 'small',
      },
      indicator: {
        background: '#FFFFFF',
        border: { color: '#C4B5FD', size: '1px' },
        iconSize: 'large',
        size: 'large',
      },
      label: {
        color: '#4C1D95',
        size: 'small',
      },
    },
  },
} satisfies ThemeType;

const meta: Meta<typeof Stepper> = {
  title: 'Visualizations/Stepper/Custom Themed',
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const CustomThemedExample = () => {
  const [currentStep, setCurrentStep] = useState('implementation');
  const [completedStep, setCompletedStep] = useState('published');
  const [currentNestedStep, setCurrentNestedStep] = useState('security');
  const steps: StepType[] = [
    { id: 'planning', title: 'Plan', status: 'completed' },
    {
      id: 'implementation',
      title: 'Build',
      description: 'Implement the release changes.',
      status: 'pending',
    },
    {
      id: 'validation',
      title: 'Validate',
      description: 'Resolve the failing checks.',
      status: 'error',
      errorMessage: 'Two checks need attention.',
    },
    { id: 'published', title: 'Publish', status: 'pending' },
    {
      id: 'archive',
      title: 'Archive',
      status: 'disabled',
      disabledReason: 'Available after publishing.',
    },
  ];
  const nestedSteps: StepType[] = [
    {
      id: 'setup',
      title: 'Project setup',
      status: 'pending',
      children: [
        { id: 'repository', title: 'Repository', status: 'completed' },
        {
          id: 'security',
          title: 'Security review',
          description: 'Review the dependency alerts.',
          status: 'error',
          errorMessage: 'One dependency needs an update.',
        },
      ],
    },
    { id: 'launch', title: 'Launch', status: 'pending' },
  ];

  return (
    <Grommet theme={customTheme}>
      <Box gap="large" pad="large">
        <Box gap="medium">
          <Heading level={3} margin="none">
            Horizontal release workflow
          </Heading>
          <Stepper
            aria-label="Release workflow"
            steps={steps}
            currentStep={currentStep}
            direction="horizontal"
            onStepClick={(id) => setCurrentStep(id)}
          />
        </Box>
        <Box gap="medium">
          <Heading level={3} margin="none">
            Vertical nested workflow
          </Heading>
          <Stepper
            aria-label="Project setup"
            steps={nestedSteps}
            currentStep={currentNestedStep}
            direction="vertical"
            onStepClick={(id) => setCurrentNestedStep(id)}
          />
        </Box>
        <Box gap="medium">
          <Heading level={3} margin="none">
            Current step already completed
          </Heading>
          <Stepper
            aria-label="Completed release"
            steps={[
              { id: 'published', title: 'Published', status: 'completed' },
            ]}
            currentStep={completedStep}
            onStepClick={(id) => setCompletedStep(id)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

export const CustomThemed: Story = {
  render: () => <CustomThemedExample />,
};
