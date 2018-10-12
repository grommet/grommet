import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'];

const All = () => (
  <Grommet theme={grommet}>
    {sizes.map(size => (
      <Box key={size} margin='small'>
        <Text size={size}>
          {`Text ${size}`}
        </Text>
      </Box>
    ))}
  </Grommet>
);

const Color = () => (
  <Grommet theme={grommet}>
    <Text color='accent-1'>
      Colored Text
    </Text>
  </Grommet>
);

storiesOf('Text', module)
  .add('All', () => <All />)
  .add('Color', () => <Color />);
