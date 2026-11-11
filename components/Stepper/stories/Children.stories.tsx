// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Stepper, Text } from 'grommet';
import type { StepType } from 'grommet';

const meta: Meta<typeof Stepper> = {
  title: 'Visualizations/Stepper/Children',
  component: Stepper,
};

export default meta;

type Story = StoryObj<typeof meta>;

const steps: StepType[] = [
  { id: 'shipping', title: 'Shipping', status: 'completed' },
  { id: 'payment', title: 'Payment' },
  { id: 'review', title: 'Review' },
];

const ChildrenExample = (args: React.ComponentProps<typeof Stepper>) => {
  const [currentStep, setCurrentStep] = useState(args.currentStep);

  return (
    <Box pad="large" width="xlarge">
      <Stepper {...args} currentStep={currentStep}>
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          return (
            <Box
              key={step.id}
              as="li"
              align="center"
              aria-current={isCurrent ? 'step' : undefined}
              direction="row"
              gap="small"
              pad="medium"
            >
              <Button plain onClick={() => setCurrentStep(step.id)}>
                <Box
                  align="center"
                  justify="center"
                  round="full"
                  height="xxsmall"
                  width="xxsmall"
                  border
                  background={isCurrent ? 'brand' : undefined}
                >
                  <Text color={isCurrent ? 'white' : undefined}>
                    {index + 1}
                  </Text>
                </Box>
                <Text>{step.title}</Text>
              </Button>
            </Box>
          );
        })}
      </Stepper>
    </Box>
  );
};

export const Children: Story = {
  args: {
    steps,
    currentStep: 'payment',
    'aria-label': 'Checkout progress',
  },
  render: (args) => <ChildrenExample {...args} />,
};
