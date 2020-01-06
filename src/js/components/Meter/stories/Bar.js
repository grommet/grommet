import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Meter } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const BarMeter = () => {
  const value = 30;

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <Meter type="bar" background="light-2" values={[{ value }]} />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Meter', module).add('Bar', () => <BarMeter />);
