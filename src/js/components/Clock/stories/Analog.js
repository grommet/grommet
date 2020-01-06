import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Clock } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const AnalogClock = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </MnetUIBase>
);

storiesOf('Clock', module).add('Analog', () => <AnalogClock />, {
  chromatic: { disable: true },
});
