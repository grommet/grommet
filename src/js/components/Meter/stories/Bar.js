import React from 'react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

export const Bar = () => {
  const value = 30;

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Meter type="bar" value={value} />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Bar',
};
