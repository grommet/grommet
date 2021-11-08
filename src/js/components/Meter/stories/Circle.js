import React, { useState, useEffect, useRef } from 'react';

import { Box, Meter } from 'grommet';

export const Circle = () => {
  const [value, setValue] = useState(20);

  const timer = useRef();
  clearTimeout(timer.current);
  timer.current = setTimeout(() => {
    setValue(value < 100 ? value + 8 : 20);
  }, 2000);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    [],
  );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Meter
        type="circle"
        background="light-2"
        values={[{ value, color: value > 50 ? 'accent-2' : 'accent-1' }]}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Circle',
};
