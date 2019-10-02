import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

function BarMeter() {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Meter type="bar" background="light-2" values={[{ value: 30 }]} />
      </Box>
    </Grommet>
  );
}

storiesOf('Meter', module).add('Bar', () => <BarMeter />);
