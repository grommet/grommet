import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';

export const Size = () => (
  <Grommet theme={grommet} full>
    {['xsmall', 'small', 'medium', 'large', 'xlarge'].map(size => (
      <Box align="center" direction="row" gap="small" pad="small" key={size}>
        <Spinner size={size} />
        <Text size={size}>{size}</Text>
      </Box>
    ))}
  </Grommet>
);

export default {
  title: 'Visualizations/Spinner/Size',
};
