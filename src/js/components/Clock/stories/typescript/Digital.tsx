import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

const DigitalClock = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" />
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Clock', module).add('Digital', () => <DigitalClock />);
}
