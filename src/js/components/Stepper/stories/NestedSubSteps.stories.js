import React, { useState } from 'react';

import { Box, Text, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import {
  CircleFill,
  Checkmark,
  StatusCritical,
} from '@hpe-design/icons-grommet';
import { Stepper } from '../Stepper';

const NestedSubSteps = () => {
  const [currentStep, setCurrentStep] = useState('email');
  const steps = [
    {
      id: 'account',
      title: 'Account Setup',
      children: [
        { id: 'email', title: 'Email', status: 'completed' },
        {
          id: 'password',
          title: 'Password',
          status: 'pending',
        },
      ],
    },
    {
      id: 'profile',
      title: 'Profile Setup',
      children: [
        { id: 'name', title: 'Name', status: 'pending' },
        {
          id: 'photo',
          title: 'Photo',
          status: 'error',
          errorMessage: 'Please upload a valid photo.',
        },
      ],
    },
    { id: 'confirm', title: 'Confirm', status: 'pending' },
  ];
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    <Grommet
      theme={deepMerge(hpe, {
        stepper: {
          description: {
            color: 'text-default',
          },
          pending: {
            indicator: {
              border: 'icon-weak',
              substep: {
                iconSize: 'xsmall',
              },
              hover: {
                border: 'icon-strong',
              },
            },
            label: {
              color: 'text-default',
              hover: {
                color: 'text-strong',
              },
            },
            connector: {
              color: 'border-default',
            },
          },
          current: {
            indicator: {
              icon: CircleFill,
              background: 'background-selected-primary-strong',
              // color: 'icon-onSelectedPrimaryStrong', !!SHOULD BE THIS
              color: 'white', // !!TEMPORARY FIX
              border: 'transparent',
              substep: {
                iconSize: 'xsmall',
              },
              hover: {
                background: 'background-selected-primary-strong-hover',
                border: 'transparent',
              },
            },
            label: {
              color: 'text-primary',
            },
          },
          currentCompleted: {
            indicator: {
              icon: Checkmark,
              background: 'background-selected-primary-strong',
              // color: 'icon-onSelectedPrimaryStrong', !!SHOULD BE THIS
              color: 'white', // !!TEMPORARY FIX
              border: 'transparent',
              substep: {
                iconSize: 'xsmall',
              },
              hover: {
                background: 'background-selected-primary-strong-hover',
                border: 'transparent',
              },
            },
            label: {
              color: 'text-primary',
            },
          },
          completed: {
            indicator: {
              icon: Checkmark,
              color: 'icon-primary',
              border: 'icon-primary',
              substep: {
                iconSize: 'xsmall',
              },
              hover: {
                border: 'icon-primary',
              },
            },
            label: {
              color: 'text-primary',
            },
            connector: {
              color: 'foreground-primary',
            },
          },
          error: {
            indicator: {
              icon: StatusCritical,
              border: 'icon-critical',
              color: 'icon-critical',
              substep: {
                iconSize: 'xsmall',
              },
              hover: {
                border: 'icon-critical',
                color: 'icon-critical',
              },
            },
            label: {
              color: 'text-critical',
            },
            connector: {
              color: 'border-critical',
            },
            helperText: {
              color: 'text-critical',
            },
          },
          currentError: {
            indicator: {
              icon: StatusCritical,
              border: 'transparent',
              background: 'icon-critical',
              // color: 'icon-onSelectedPrimaryStrong', !!SHOULD BE THIS
              color: 'white', // !!TEMPORARY FIX
              substep: {
                iconSize: 'xsmall',
              },
              hover: {
                background: 'icon-critical',
                border: 'transparent',
                // color: 'icon-onSelectedPrimaryStrong', !!SHOULD BE THIS
                color: 'white', // !!TEMPORARY FIX
              },
            },
            label: {
              color: 'text-critical',
            },
            connector: {
              color: 'border-critical',
            },
            helperText: {
              color: 'text-critical',
            },
          },
          disabled: {
            indicator: {
              border: 'icon-disabled',
              background: 'transparent',
              hover: {
                border: 'icon-disabled',
                background: 'transparent',
              },
            },
            label: {
              color: 'text-default',
            },
            connector: {
              color: 'border-disabled',
            },
            helperText: {
              color: 'text-default',
            },
          },
        },
      })}
    >
      <Box pad="large" gap="medium">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="vertical"
          aria-label="Account setup progress"
          onStepClick={(id) => setCurrentStep(id)}
        />
        <Text>
          Parent:{' '}
          {steps.find((s) => s.children?.some((c) => c.id === currentStep))
            ?.title || 'None'}
        </Text>
        <Text>Current Step: {currentStep}</Text>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Nested Sub-Steps',
};

export { NestedSubSteps };
