import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, MnetUIBase, Clock } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const DigitalClock = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" />
    </Box>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Clock', module).add('Digital', () => <DigitalClock />);
}
