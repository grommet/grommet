import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Clock } from 'mnet-ui-base';

const AnalogClock = () => (
  <>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Clock', module).add('Analog', () => <AnalogClock />);
}
