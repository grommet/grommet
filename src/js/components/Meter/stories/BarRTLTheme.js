import React from 'react';

import { Box, Meter, Grommet } from 'grommet';

export const BarRTLTheme = () => {
  const value = 30;

  return (
    <Grommet dir="rtl">
      <Box align="center" pad="large">
        <Meter type="bar" value={value} />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/BarRTLTheme',
};
