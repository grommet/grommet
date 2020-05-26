import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" time="PT0H0M20S" run="backward" />
    </Box>
  </Grommet>
);

storiesOf('Clock', module).add('Countdown', () => <Example />, {
  chromatic: { disable: true },
});
