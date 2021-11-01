import React from 'react';

import { Box, Grommet, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

const gradientA = [
  { value: 0, color: 'purple' },
  { value: 50, color: 'white' },
  { value: 100, color: 'blue' },
];

const gradientB = [
  { value: 0, color: 'red' },
  { value: 100, color: 'yellow' },
];

export const Gradient = () => (
  <Grommet theme={grommet}>
    <Box justify="center" pad="large" direction="row" gap="small">
      <Meter
        type="circle"
        background="light-2"
        size="small"
        value={100}
        color={gradientA}
      />
      <Meter
        type="circle"
        background="light-2"
        size="small"
        value={100}
        color={[
          {
            gradientUnits: 'userSpaceOnUse',
            gradientTransform: 'rotate(90)',
          },
          ...gradientA,
        ]}
      />
      <Meter
        type="circle"
        background="light-2"
        size="small"
        value={25}
        color={[
          {
            gradientTransform: 'rotate(90)',
          },
          ...gradientA,
        ]}
      />

      <Meter
        type="circle"
        background="light-2"
        size="small"
        value={25}
        color={[
          {
            gradientUnits: 'userSpaceOnUse',
            gradientTransform: 'rotate(90)',
          },
          ...gradientA,
        ]}
      />

      <Meter
        type="circle"
        background="light-2"
        size="small"
        values={[
          { value: 25, color: gradientA },
          { value: 25, color: gradientB },
        ]}
      />
    </Box>

    <Box justify="center" pad="large" direction="row" gap="small">
      <Meter
        type="circle"
        background="light-2"
        size="small"
        values={[
          { value: 25, color: gradientA },
          { value: 25, color: gradientB },
        ]}
      />
    </Box>

    <Box align="center" pad="large">
      <Meter
        type="bar"
        background="light-2"
        value={100}
        color={[
          {
            gradientUnits: 'userSpaceOnUse',
            gradientTransform: 'rotate(0)',
          },
          { value: 0, color: 'purple' },
          { value: 50, color: 'white' },
          { value: 100, color: 'blue' },
        ]}
      />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Meter/Gradient',
};
