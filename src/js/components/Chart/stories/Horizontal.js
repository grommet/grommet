import React from 'react';

import { Box, Chart } from 'grommet';

const gradient = [
  { value: 0, color: 'status-ok' },
  { value: 25, color: 'status-ok' },
  { value: 27, color: 'status-warning' },
  { value: 30, color: 'status-critical' },
];

export const Horizontal = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large" gap="large">
    {['bar', 'line', 'area', 'point'].map((type) => (
      <Box key={type} direction="row" gap="medium">
        {['vertical', 'horizontal'].map((direction) => (
          <Box key={direction} border>
            <Chart
              type={type}
              direction={direction}
              size="small"
              values={[
                [10, 20],
                [20, 30],
                [30, 15],
              ]}
            />
          </Box>
        ))}
      </Box>
    ))}
    <Box direction="row" gap="medium">
      {['vertical', 'horizontal'].map((direction) => (
        <Box key={direction} border>
          <Chart
            id={direction}
            type="line"
            direction={direction}
            color={gradient}
            values={[20, 30, 15]}
            size="small"
          />
        </Box>
      ))}
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Horizontal',
};
