import React from 'react';

import { Box, Meter } from 'grommet';

export const ReverseBar = () => {
  const value = 30;

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Meter type="bar" reverse value={value} />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/ReverseBar',
};
