import React, { useMemo, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Heading, Paragraph, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Nested Sub-Steps',
  component: Stepper,
} as Meta<typeof Stepper>;

const flattenStepHierarchy = (steps: any[]): any[] =>
  steps.flatMap((step) => {
    const children = Array.isArray(step.children) ? step.children : [];
    return [step, ...flattenStepHierarchy(children)];
  });

export const NestedSubSteps: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('security');

  const steps = useMemo(
    () => [
      {
        id: 'account',
        title: 'Account Setup',
        children: [
          {
            id: 'profile',
            title: 'Profile',
            status: 'completed' as const,
          },
          {
            id: 'security',
            title: 'Security',
            status: 'pending' as const,
            description: 'Configure password and recovery settings.',
          },
        ],
      },
      {
        id: 'billing',
        title: 'Billing Setup',
        children: [
          {
            id: 'payment',
            title: 'Payment Method',
            status: 'pending' as const,
          },
          {
            id: 'tax',
            title: 'Tax Details',
            status: 'pending' as const,
          },
        ],
      },
      {
        id: 'review',
        title: 'Review & Submit',
        status: 'pending' as const,
      },
    ],
    [],
  );

  const linearSteps = useMemo(() => flattenStepHierarchy(steps), [steps]);
  const activeStep = linearSteps.find((step) => step.id === currentStep);

  return (
    <Grommet theme={grommet} full>
      <Box direction="row" gap="large" pad="large">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="vertical"
          onStepClick={(stepId) => setCurrentStep(stepId)}
        />
        <Box flex>
          <Heading level={3} margin={{ top: 'none' }}>
            Active Step: {activeStep?.title || currentStep}
          </Heading>
          <Paragraph margin={{ top: 'none' }}>
            This story demonstrates parent/child rendering and child-first
            navigation across nested sub-steps.
          </Paragraph>
          <Paragraph margin={{ top: 'none' }}>
            Use arrow keys in the Stepper to traverse parent and child nodes.
          </Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

NestedSubSteps.storyName = 'Nested Sub-Steps';
