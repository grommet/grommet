import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Meter } from 'mnet-ui-base';

const BarMeter = () => {
  const value = 30;

  return (
    <>
      <Box align="center" pad="large">
        <Meter type="bar" background="light-2" values={[{ value }]} />
      </Box>
    </>
  );
};

storiesOf('Meter', module).add('Bar', () => <BarMeter />);
