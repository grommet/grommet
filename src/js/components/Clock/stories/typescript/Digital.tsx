import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Clock } from 'mnet-ui-base';

const DigitalClock = () => (
  <>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" />
    </Box>
  </>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Clock', module).add('Digital', () => <DigitalClock />);
}
