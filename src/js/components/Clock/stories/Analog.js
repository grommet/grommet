import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Clock } from 'mnet-ui-base';

const AnalogClock = () => (
  <>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </>
);

storiesOf('Clock', module).add('Analog', () => <AnalogClock />, {
  chromatic: { disable: true },
});
