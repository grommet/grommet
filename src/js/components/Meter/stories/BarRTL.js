import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

const BarRTLMeter = () => {
  const value = 30;

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Meter
          type="bar"
          background="light-2"
          direction="rtl"
          values={[{ value }]}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Meter', module).add('Bar (RTL)', () => <BarRTLMeter />);
