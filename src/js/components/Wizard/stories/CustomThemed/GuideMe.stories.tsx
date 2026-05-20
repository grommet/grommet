import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Button,
  Grommet,
  Heading,
  Paragraph,
  Text,
  Wizard,
  useWizard,
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
      { id: 'rec1', title: 'Recommendation 1', skippable: true },
      { id: 'rec2', title: 'Recommendation 2', skippable: true },
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
  rec1: (
    <Box gap="small">
      <Heading level={3} margin="none">
        Recommendation 1
      </Heading>
      <Paragraph margin="none">
        Enable baseline security policy for new devices.
      </Paragraph>
      <Text size="small" color="text-weak">
        Parent "Recommended actions" is a grouping container. Entering this
        section lands on the first child step.
      </Text>
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
      <Text size="small" color="text-weak">
        Child steps remain visible in the Stepper after first reveal.
      </Text>
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

const renderGuideStep = (step: StepDefinition, context: RenderStepContext) => (
  <Box gap="medium">
    <Box pad="small" background="background-contrast" round="xsmall">
      <Text size="small" color="text-weak">
        Current step: {context.currentStep}
      </Text>
      <Text size="small" color="text-weak">
        Parents are grouping-only. Navigating to a parent id lands on its first
        child.
      </Text>
    </Box>
    <Text size="small" color="text-weak">
      Story content rendered from an external stepId map
    </Text>
    {stepContentById[step.id] ?? (
      <Paragraph margin="none">No content registered for this step.</Paragraph>
    )}
  </Box>
);

type StepChangeDebugEvent = {
  fromStepId?: string;
  toStepId?: string;
  trigger?: string;
  phase?: string;
  blocked?: boolean;
  error?: string;
};

const GuideMeDebugPanel = ({
  lastEvent,
}: {
  lastEvent?: StepChangeDebugEvent;
}) => {
  const { currentStep, navigation } = useWizard();

  return (
    <Box
      pad="small"
      gap="small"
      border={{ color: 'border-weak', side: 'all' }}
      round="xsmall"
      background="background-front"
    >
      <Text weight="bold" size="small">
        Debug Panel: goTo(parentId)
      </Text>
      <Text size="small" color="text-weak">
        Current step: {currentStep}
      </Text>
      <Box direction="row" gap="xsmall" wrap>
        <Button
          size="small"
          label="goTo('recommendations')"
          onClick={() => navigation.goTo('recommendations')}
        />
        <Button
          size="small"
          label="goTo('rec1')"
          onClick={() => navigation.goTo('rec1')}
        />
        <Button
          size="small"
          label="goTo('rec2')"
          onClick={() => navigation.goTo('rec2')}
        />
      </Box>
      <Box direction="row" gap="xsmall" wrap>
        <Button size="small" label="Previous" onClick={navigation.previous} />
        <Button size="small" label="Next" onClick={navigation.next} />
        <Button size="small" label="Skip" onClick={navigation.skip} />
      </Box>
      <Text size="xsmall" color="text-weak">
        Expected: goTo('recommendations') lands on 'rec1' (first child), not the
        parent.
      </Text>
      <Text size="xsmall" color="text-weak">
        Last event:{' '}
        {lastEvent
          ? `${lastEvent.trigger || 'n/a'} / ${lastEvent.phase || 'n/a'} / ${
              lastEvent.fromStepId || 'n/a'
            } -> ${lastEvent.toStepId || 'n/a'}`
          : 'none'}
      </Text>
    </Box>
  );
};

const renderGuideDebugStep = (
  step: StepDefinition,
  context: RenderStepContext,
  lastEvent?: StepChangeDebugEvent,
) => (
  <Box gap="medium">
    <GuideMeDebugPanel lastEvent={lastEvent} />
    <Box pad="small" background="background-contrast" round="xsmall">
      <Text size="small" color="text-weak">
        Current step: {context.currentStep}
      </Text>
      <Text size="small" color="text-weak">
        Parent ids are accepted by goTo(), and Wizard redirects to first child.
      </Text>
    </Box>
    {stepContentById[step.id] ?? (
      <Paragraph margin="none">No content registered for this step.</Paragraph>
    )}
  </Box>
);

export const GuideMe: StoryFn<typeof Wizard> = () => {
  const onStepChange = (event: unknown) => {
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

export const GuideMeGoToParentDebug: StoryFn<typeof Wizard> = () => {
  const [lastEvent, setLastEvent] = useState<StepChangeDebugEvent>();

  const onStepChange = (event: unknown) => {
    if (event && typeof event === 'object') {
      const debugEvent = event as StepChangeDebugEvent;
      setLastEvent(debugEvent);
    }
    console.log(event);
  };

  return (
    <Grommet full theme={customTheme}>
      <Box width="xlarge" margin="auto" border>
        <Wizard
          a11yTitle="Guide me debug: goTo parent id behavior"
          steps={steps}
          defaultStep="devices"
          onStepChange={onStepChange}
          onCancel={() => {}}
          onComplete={(data) =>
            alert(`Complete! ${JSON.stringify(data.completedSteps)}`)
          }
          showProgress="vertical"
          renderStep={(step, context) =>
            renderGuideDebugStep(step, context, lastEvent)
          }
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
GuideMeGoToParentDebug.storyName = 'Guide Me goTo(parentId) Debug';
