import React from 'react';

import { Box, Heading, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const ThemingLightDark = () => {
  const steps = [
    { id: 'step1', title: 'Account', status: 'completed' },
    { id: 'step2', title: 'Profile', status: 'pending' },
    { id: 'step3', title: 'Review', status: 'pending' },
  ];
  return (
    <Box gap="large">
      <Grommet theme={grommet} themeMode="light">
        <Box pad="large" background="background-front">
          <Heading level={3}>Light Theme</Heading>
          <Stepper steps={steps} currentStep="step2" clickableSteps={false} />
        </Box>
      </Grommet>
      <Grommet theme={grommet} themeMode="dark">
        <Box pad="large" background="background-front">
          <Heading level={3}>Dark Theme</Heading>
          <Stepper steps={steps} currentStep="step2" clickableSteps={false} />
        </Box>
      </Grommet>
    </Box>
  );
};

export default {
  title: 'Visualizations/Stepper/Theming Light Dark',
};

export { ThemingLightDark };
