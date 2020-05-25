import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Clock } from 'mnet-ui-base';

const DigitalClock = () => (
  <>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" />
    </Box>
  </>
);

storiesOf('Clock', module).add('Digital', () => <DigitalClock />, {
  chromatic: { disable: true },
});
