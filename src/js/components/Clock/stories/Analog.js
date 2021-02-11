import React from 'react';

import { Box, Grommet, Clock, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const sizes = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  'huge',
];

export const Analog = () => (
  <Grommet theme={grommet}>
    <Box direction="row" gap="small" pad="large">
      {sizes.map(size => (
        <Box key={size} align="center">
          <Text>{size}</Text>
          <Clock type="analog" size={size} />
        </Box>
      ))}
    </Box>
    <Box pad="large">
      <Text>
        xxlarge and huge sizes are equal. The latter is kept for beckwards
        compatibility.
      </Text>
    </Box>
  </Grommet>
);

Analog.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Clock/Analog',
};
