import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

const CustomThemeAnalogClock = {
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

const DigitalClock = ({ ...rest }) => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" {...rest} />
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

const CustomAnalogClock = () => (
  <Grommet theme={CustomThemeAnalogClock}>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </Grommet>
);

storiesOf('Clock', module)
  .add('Digital', () => <DigitalClock />)
  .add('Digital Backward', () => (
    <DigitalClock time="T10:00:00" run="backward" />
  ))
  .add('Analog', () => <AnalogClock />)
  .add('Custom Analog', () => <CustomAnalogClock />);
