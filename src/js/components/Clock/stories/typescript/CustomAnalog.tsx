import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Box, Grommet, Clock } from 'grommet';

const analogClockTheme = {
  clock: {
    analog: {
      size: {
        medium: '200px',
      },
      hour: {
        width: '8px',
        shape: 'square',
        color: 'accent-1',
        size: '30px',
      },
      minute: {
        size: '12px',
        width: '6px',
        color: 'grey',
      },
      second: {
        width: '4px',
        color: 'brand',
        size: '5px',
      },
    },
  },
};

const CustomAnalog = () => (
  <Grommet theme={analogClockTheme}>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Clock', module).add('Custom Analog', () => (
    <CustomAnalog />
  ));
}
