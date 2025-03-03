import React from 'react';

import { Box, Chart } from 'grommet';

export const Pattern = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large" gap="medium">
    {[
      'squares',
      'circles',
      'stripesHorizontal',
      'stripesVertical',
      'stripesDiagonalDown',
      'stripesDiagonalUp',
    ].map((pattern) => (
      <Chart
        key={pattern}
        id={`area-${pattern}`}
        type="area"
        pattern={pattern}
        thickness="xsmall"
        values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
      />
    ))}
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Pattern',
};
