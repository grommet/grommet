import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const PlainLayer = () => (
  <Grommet theme={grommet} full>
    <Box fill background="dark-3">
      <Layer margin="medium" plain>
        <Box pad="large" border={{ color: 'accent-1', size: 'large' }}>
          <Text color="accent-2">Text</Text>
        </Box>
      </Layer>
    </Box>
  </Grommet>
);

storiesOf('Layer', module).add('Plain', () => <PlainLayer />);
