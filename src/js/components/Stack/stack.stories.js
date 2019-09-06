import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleStack = () => (
  <Grommet>
    <Stack anchor="center">
      <Box pad="large" background="neutral-1" />
      <Box pad="small" background="accent-1" />
    </Stack>
  </Grommet>
);

const FillStack = () => (
  <Grommet theme={grommet} full>
    <Stack fill>
      <Box background="brand" fill>
        Test
      </Box>
    </Stack>
  </Grommet>
);

storiesOf('Stack', module)
  .add('Simple', () => <SimpleStack />)
  .add('Fill', () => <FillStack />);
