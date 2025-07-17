import React, { useState, useEffect } from 'react';

import { Box, Meter } from 'grommet';

export const Circle = () => {
  const [value, setValue] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(value < 60 ? value + 8 : 20);
    }, 2000);
    return () => clearInterval(interval);
  }, [value]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Meter
        type="circle"
        background="light-2"
        values={[
          { value, color: value > 50 ? 'status-critical' : 'status-ok' },
        ]}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Circle',
};
