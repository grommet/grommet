// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { hpe } from 'grommet-theme-hpe';
import {
  Box,
  Grommet,
  Heading,
  ThemeContext,
  ThemeType,
  Stepper,
  StepType,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import {
  light,
  dark,
  // components,
  // dimension,
  // global as globalTokens,
} from 'hpe-design-tokens/grommet';
import { CircleFill, Checkmark, StatusCritical } from '@hpe-design/icons-grommet';

// const { hpe: hpeComponents } = components;
// const { hpe: hpeDimension } = dimension;
// const { hpe: hpeGlobal } = globalTokens;
const iconOnSelectedPrimaryStrong = {
    light: light.hpe.color.icon.onSelectedPrimaryStrong,
    dark: dark.hpe.color.icon.onSelectedPrimaryStrong,
  };

const theme: ThemeType = deepMerge({}, hpe, {
  stepper: {
    button: {
      pad: '5xsmall',
    },
    label: { color: 'text-default' },
    description: { color: 'text-default' },
    errorText: { color: 'text-critical' },
    disabledReason: { color: 'text-default' },
    connector: {
      color: 'border-default',
      margin: '5xsmall',
    },
    vertical: {
      button: {
        gap: 'xsmall',
      },
      connector: {
        margin: '0px',
      },
    },
    subStep: {
      indicator: {
        iconSize: 'xsmall',
      },
    },
    pending: {
      indicator: {
        border: { color: 'icon-weak' },
      },
      hover: {
        indicator: {
          border: { color: 'icon-strong' },
        },
      },
    },
    current: {
      indicator: {
        icon: CircleFill,
        background: 'background-selected-primary-strong',
        color: iconOnSelectedPrimaryStrong,
        border: { color: 'transparent' },
      },
      label: {
        color: 'text-primary',
      },
      hover: {
        indicator: {
          background: 'background-selected-primary-strong-hover',
          color: iconOnSelectedPrimaryStrong,
          border: { color: 'transparent' },
        },
      },
    },
    currentCompleted: {
      indicator: {
        icon: Checkmark,
        background: 'background-selected-primary-strong',
        color: iconOnSelectedPrimaryStrong,
        border: { color: 'transparent' },
      },
      label: {
        color: 'text-primary',
      },
      connector: {
        color: 'foreground-primary',
      },
      hover: {
        indicator: {
          background: 'background-selected-primary-strong-hover',
          color: iconOnSelectedPrimaryStrong,
          border: { color: 'transparent' },
        },
      },
    },
    completed: {
      indicator: {
        icon: Checkmark,
        color: 'icon-primary',
        border: { color: 'icon-primary' },
      },
      label: {
        color: 'text-primary',
      },
      connector: {
        color: 'foreground-primary',
      },
      hover: {
        indicator: {
          border: { color: 'icon-primary-hover' },
          color: 'icon-primary-hover',
        },
      },
    },
    error: {
      indicator: {
        icon: StatusCritical,
        border: { color: 'icon-critical' },
        color: 'icon-critical',
      },
      label: {
        color: 'text-critical',
      },
      connector: {
        color: 'border-critical',
      },
    },
    currentError: {
      indicator: {
        icon: StatusCritical,
        border: { color: 'transparent' },
        background: 'icon-critical',
        color: 'icon-onStrong',
      },
      label: {
        color: 'text-critical',
      },
      connector: {
        color: 'border-critical',
      },
      description: {
        color: 'text-critical',
      },
    },
    disabled: {
      indicator: {
        border: { color: 'icon-disabled' },
        background: 'transparent',
      },
      label: {
        color: 'text-default',
      },
      connector: {
        color: 'border-disabled',
      },
    },
  },
});

export const CustomThemedHpe = () => {
  const [currentStep, setCurrentStep] = useState('profile');
  const steps : StepType[] = [
    { id: 'account', title: 'Account', status: 'completed' },
    { id: 'profile', title: 'Profile', status: 'disabled', disabledReason: 'Profile step is disabled' },
    { id: 'advanced', title: 'Advanced', status: 'error', errorMessage: 'Error in advanced step' },
    { id: 'review', title: 'Review', status: 'pending' },
  ];
  const vsteps : StepType[] = [
    { id: 'account', title: 'Account', status: 'completed' },
    { id: 'profile', title: 'Profile', status: 'disabled', disabledReason: 'Profile step is disabled' },
    { id: 'advanced', title: 'Advanced', 
      children: [
        { id: 'advanced-a', title: 'Advanced A', status: 'error', errorMessage: 'Error in advanced step' },
        { id: 'advanced-b', title: 'Advanced B', status: 'pending' },
      ],
    },
    { id: 'review', title: 'Review', status: 'pending' },
  ];
  return (
    <Grommet theme={theme}>
      <Box gap="xlarge" pad="large">
        <Box fill="horizontal" gap="medium">
          <Heading level={3} margin="none">
            Full Stepper theme, extending grommet-theme-hpe
          </Heading>
          <Box gap="medium" pad="large">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              direction="horizontal"
              onStepClick={(id) => setCurrentStep(id)}
            />
          </Box>
        </Box>
        <ThemeContext.Extend value={{ dark: true }}>
          <Box
            fill="horizontal"
            gap="medium"
            pad="large"
            background="background-front"
          >
            <Heading level={3} margin="none">
              Dark Theme
            </Heading>
            <Stepper
              steps={steps}
              currentStep={currentStep}
              direction="horizontal"
              onStepClick={(id) => setCurrentStep(id)}
            />
          </Box>
        </ThemeContext.Extend>
        <Box fill="horizontal" gap="medium">
          <Box gap="medium" pad="large">
            <Stepper
              steps={vsteps}
              currentStep={currentStep}
              direction="vertical"
              onStepClick={(id) => setCurrentStep(id)}
            />
          </Box>
        </Box>
        <ThemeContext.Extend value={{ dark: true }}>
          <Box
            fill="horizontal"
            gap="medium"
            pad="large"
            background="background-front"
          >
            <Heading level={3} margin="none">
              Dark Theme
            </Heading>
            <Stepper
              steps={vsteps}
              currentStep={currentStep}
              direction="vertical"
              onStepClick={(id) => setCurrentStep(id)}
            />
          </Box>
        </ThemeContext.Extend>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Custom Themed/Hpe',
};
