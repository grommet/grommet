import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Stack } from 'mnet-ui-base';

const SimpleStack = () => (
  <MnetUIBase>
    <Stack anchor="center">
      <Box pad="large" background="neutral-1" />
      <Box pad="small" background="accent-1" />
    </Stack>
  </MnetUIBase>
);

const FillStack = () => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
    <Stack fill>
      <Box background="brand" fill>
        Test
      </Box>
    </Stack>
  </div>
);

storiesOf('Stack', module)
  .add('Simple', () => <SimpleStack />)
  .add('Fill', () => <FillStack />);
