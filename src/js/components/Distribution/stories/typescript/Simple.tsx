import React from 'react';

import { Box, Distribution, Text } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Distribution
    fill
    values={[
      { value: 50, color: 'light-3' },
      { value: 30, color: 'neutral-2' },
      { value: 20, color: 'brand' },
      { value: 10, color: 'light-3' },
      { value: 5, color: 'neutral-1' },
    ]}
  >
    {(value) => (
      <Box pad="xsmall" background={value.color} fill>
        <Text size="large">{value.value}</Text>
      </Box>
    )}
  </Distribution>
  //</Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Visualizations/Distribution/Simple',
};
