import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Stack } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleStack = () => (
  <MnetUIBase>
    <Stack anchor="center">
      <Box pad="large" background="neutral-1" />
      <Box pad="small" background="accent-1" />
    </Stack>
  </MnetUIBase>
);

const FillStack = () => (
  <MnetUIBase theme={mnet} full>
    <Stack fill>
      <Box background="brand" fill>
        Test
      </Box>
    </Stack>
  </MnetUIBase>
);

storiesOf('Stack', module)
  .add('Simple', () => <SimpleStack />)
  .add('Fill', () => <FillStack />);
