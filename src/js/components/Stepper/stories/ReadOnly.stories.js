import React from 'react';

import { Box } from 'grommet';
import { Stepper } from '../Stepper';

const ReadOnly = () => {
  const steps = [
    { id: 'step1', title: 'Step 1', status: 'completed' },
    { id: 'step2', title: 'Step 2', status: 'completed' },
    { id: 'step3', title: 'Step 3', status: 'pending' },
    { id: 'step4', title: 'Step 4', status: 'pending' },
  ];
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large">
      <Stepper steps={steps} currentStep="step3" clickableSteps={false} />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Read-Only',
};

export { ReadOnly };
