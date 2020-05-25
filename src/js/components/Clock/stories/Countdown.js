import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Clock } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Example = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" time="PT0H0M20S" run="backward" />
    </Box>
  </MnetUIBase>
);

storiesOf('Clock', module).add('Countdown', () => <Example />, {
  chromatic: { disable: true },
});
