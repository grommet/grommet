import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const sizes = [
  'xxlarge',
  'xlarge',
  'large',
  'medium',
  'small',
  'xsmall',
  '77px',
];

const All = () => (
  <MnetUIBase theme={mnet}>
    {sizes.map(size => (
      <Box key={size} margin="small">
        <Text size={size}>{`Text ${size}`}</Text>
      </Box>
    ))}
  </MnetUIBase>
);

storiesOf('Text', module).add('All', () => <All />);
