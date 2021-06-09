import React from 'react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

export const VerticalBar = () => {
  const value = 30;

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Meter type="bar" value={value} direction="vertical" />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Vertical Bar',
};
