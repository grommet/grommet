import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, MnetUIBase, Clock } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const AnalogClock = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Clock', module).add('Analog', () => <AnalogClock />);
}
