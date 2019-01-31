import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Clock } from '..';
import { grommet } from '../../themes';

const DigitalClock = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" />
    </Box>
  </Grommet>
);

const AnalogClock = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </Grommet>
);

storiesOf('Clock', module)
  .add('Digital Clock', () => <DigitalClock />)
  .add('Analog Clock', () => <AnalogClock />);
