import React from 'react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const override = {
  meter: {
    gradients: {
      linear: {
        props: {
          id: 'linear',
          gradientTransform: 'rotate(90)',
          gradientUnits: 'userSpaceOnUse',
        },
        stops: [
          { offset: '5%', stopColor: 'red' },
          { offset: '95%', stopColor: 'gold' },
        ],
      },
      awesome: {
        props: {
          id: 'awesome',
          gradientTransform: 'rotate(45)',
          gradientUnits: 'userSpaceOnUse',
        },
        stops: [
          { offset: '65%', stopColor: 'purple' },
          { offset: '95%', stopColor: 'blue' },
        ],
      },
      third: {
        props: {
          id: 'third',
          gradientUnits: 'userSpaceOnUse',
        },
        stops: [
          { offset: '45%', stopColor: 'purple' },
          { offset: '95%', stopColor: 'blue' },
        ],
      },
      random: {
        props: {
          id: 'random',
        },
        stops: [
          { offset: '45%', stopColor: 'purple' },
          { offset: '95%', stopColor: 'blue' },
        ],
      },
    },
  },
};

export const Gradient = () => (
  <Grommet theme={deepMerge(grommet, override)}>
    <Box align="center" pad="large" gap="medium">
      <Box direction="row" gap="small">
        <Meter
          type="circle"
          size="small"
          round
          color="grad-random"
          value={55}
          max={100}
        />
        <Meter
          type="circle"
          size="small"
          round
          values={[
            { value: 21, color: 'grad-awesome' },
            { value: 37, color: 'grad-linear' },
            { value: 0.1, color: 'blue' },
            { value: 0.1, color: 'red' },
          ]}
          max={100}
        />
        <Meter
          type="circle"
          size="small"
          values={[
            { value: 21, color: 'grad-awesome' },
            { value: 37, color: 'grad-linear' },
            { value: 0.1, color: 'blue' },
            { value: 0.1, color: 'red' },
          ]}
          max={100}
        />
      </Box>
      <Meter values={[{ value: 40, color: 'grad-third' }]} max={100} />
      <Meter round values={[{ value: 90, color: 'grad-third' }]} max={100} />
      <Meter color="grad-third" value={55} max={100} />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Meter/Gradient',
};
