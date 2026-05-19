import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Button,
  Grommet,
  Heading,
  Paragraph,
  Text,
  Wizard,
  type StepDefinition,
  type RenderStepContext,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const customTheme = deepMerge(hpe, {
  wizard: {
    container: {
      background: 'background-back',
      // gap: undefined,
    },
    header: {
      background: 'background-front',
      pad: { horizontal: 'large', vertical: 'xsmall' },
    },
    footer: {
      background: 'background-front',
      pad: { horizontal: 'large', vertical: 'xsmall' },
    },
  },
});

const steps: StepDefinition[] = [
  { id: 'subscriptions', title: 'Add subscriptions' },
  { id: 'devices', title: 'Add devices' },
  {
    id: 'recommendations',
    title: 'Recommended actions',
    children: [
      { id: 'rec1', title: 'Recommendation 1' },
      { id: 'rec2', title: 'Recommendation 2' },
    ],
  },
  { id: 'review', title: 'Wrap up' },
];

const stepContentById: Record<string, React.ReactNode> = {
  subscriptions: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Add subscriptions
      </Heading>
      <Paragraph margin="none">
        Select the service tiers and plans required for this deployment.
      </Paragraph>
      <Button label="View available plans" secondary />
    </Box>
  ),
  devices: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Add devices
      </Heading>
      <Paragraph margin="none">
        Register target devices and assign groups for management.
      </Paragraph>
      <Button label="Import devices" secondary />
    </Box>
  ),
  recommendations: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Recommended actions
      </Heading>
      <Paragraph margin="none">
        Review generated recommendations before processing sub-steps.
      </Paragraph>
    </Box>
  ),
  rec1: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Recommendation 1
      </Heading>
      <Paragraph margin="none">
        Enable baseline security policy for new devices.
      </Paragraph>
      <Button label="Apply baseline" primary />
    </Box>
  ),
  rec2: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Recommendation 2
      </Heading>
      <Paragraph margin="none">
        Configure monitoring alerts and escalation routing.
      </Paragraph>
      <Button label="Configure alerts" primary />
    </Box>
  ),
  review: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Wrap up
      </Heading>
      <Paragraph margin="none">
        Confirm your selections and complete the guided workflow.
      </Paragraph>
    </Box>
  ),
};

const renderGuideStep = (step: StepDefinition, _context: RenderStepContext) => (
  <Box gap="small">
    <Text size="small" color="text-weak">
      Content rendered from an external stepId map
    </Text>
    {stepContentById[step.id] ?? (
      <Paragraph margin="none">No content registered for this step.</Paragraph>
    )}
  </Box>
);

export const GuideMe: StoryFn<typeof Wizard> = () => {
  const onStepChange = (event: any) => {
    console.log(event);
  };

  return (
    <Grommet full theme={customTheme}>
      <Box width="xlarge" margin="auto" border>
        <Wizard
          a11yTitle="Guide me: Add devices and subscriptions"
          steps={steps}
          onStepChange={onStepChange}
          onCancel={() => {}}
          onComplete={(data) =>
            alert(`Complete! ${JSON.stringify(data.completedSteps)}`)
          }
          showProgress="vertical"
          renderStep={renderGuideStep}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Controls/Wizard/Guide Me',
  component: Wizard,
} as Meta<typeof Wizard>;

GuideMe.storyName = 'Guide Me';
