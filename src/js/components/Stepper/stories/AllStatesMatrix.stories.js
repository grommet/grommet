import React from 'react';

import { Box, Heading, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const AllStatesMatrix = () => {
  const states = [
    {
      id: 'pending',
      title: 'Pending',
      status: 'pending',
    },
    {
      id: 'completed',
      title: 'Completed',
      status: 'completed',
    },
    {
      id: 'error',
      title: 'Error',
      status: 'error',
      errorMessage: 'Something went wrong.',
    },
    {
      id: 'disabled',
      title: 'Disabled',
      status: 'disabled',
      disabledReason: 'Not available yet.',
    },
  ];
  return (
    <Grommet theme={grommet}>
      <Box pad="large" gap="large">
        <Box>
          <Heading level={3}>Horizontal — Current: &quot;pending&quot;</Heading>
          <Stepper
            steps={states}
            currentStep="pending"
            direction="horizontal"
            clickableSteps={false}
          />
        </Box>
        <Box>
          <Heading level={3}>
            Horizontal — Current: &quot;completed&quot;
          </Heading>
          <Stepper
            steps={states}
            currentStep="completed"
            direction="horizontal"
            clickableSteps={false}
          />
        </Box>
        <Box>
          <Heading level={3}>Horizontal — Current: &quot;error&quot;</Heading>
          <Stepper
            steps={states}
            currentStep="error"
            direction="horizontal"
            clickableSteps={false}
          />
        </Box>
        <Box>
          <Heading level={3}>Vertical — Current: &quot;pending&quot;</Heading>
          <Stepper
            steps={states}
            currentStep="pending"
            direction="vertical"
            clickableSteps={false}
          />
        </Box>
        <Box>
          <Heading level={3}>Vertical with Sub-steps</Heading>
          <Stepper
            steps={[
              {
                id: 'setup',
                title: 'Account Setup',
                status: 'completed',
                children: [
                  {
                    id: 'email',
                    title: 'Email',
                    status: 'completed',
                  },
                  {
                    id: 'password',
                    title: 'Password',
                    status: 'completed',
                  },
                ],
              },
              {
                id: 'profile',
                title: 'Profile Setup',
                status: 'pending',
                children: [
                  {
                    id: 'name',
                    title: 'Name',
                    status: 'pending',
                  },
                  {
                    id: 'photo',
                    title: 'Photo',
                    status: 'pending',
                  },
                ],
              },
              {
                id: 'confirm',
                title: 'Confirm',
                status: 'pending',
              },
            ]}
            currentStep="name"
            direction="vertical"
            clickableSteps={false}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/All States Matrix',
};

export { AllStatesMatrix };
