import React from 'react';

import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

export const Pattern = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="medium">
      {[
        'squares',
        'circles',
        'stripesHorizontal',
        'stripesVertical',
        'stripesDiagonalDown',
        'stripesDiagonalUp',
      ].map(pattern => (
        <Chart
          id="area"
          type="area"
          pattern={pattern}
          thickness="xsmall"
          values={[
            { value: [10, 20] },
            { value: [20, 30] },
            { value: [30, 15] },
          ]}
        />
      ))}
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Chart/Pattern',
};
