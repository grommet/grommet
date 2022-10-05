import React from 'react';

import { Box, Spinner, Text } from 'grommet';

export const Size = () => (
  <>
    {['xsmall', 'small', 'medium', 'large', 'xlarge'].map((size) => (
      <Box align="center" direction="row" gap="small" pad="small" key={size}>
        <Spinner size={size} />
        <Text size={size}>{size}</Text>
      </Box>
    ))}
  </>
);

export default {
  title: 'Visualizations/Spinner/Size',
};
