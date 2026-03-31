import React from 'react';

import { Box, Spinner, Text } from 'grommet';

export const Border = () => (
  <Box gap="large" pad="medium">
    <Box align="center" direction="row" gap="small">
      <Spinner
        border={[
          { side: 'all', color: 'transparent', size: 'medium' },
          { side: 'horizontal', color: 'brand', size: 'medium' },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small">
      <Spinner
        border={[
          {
            side: 'all',
            color: 'brand',
            size: 'medium',
            style: 'dotted',
          },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="medium">
      <Spinner
        border={[
          {
            side: 'horizontal',
            color: 'brand',
            size: 'large',
            style: 'inset',
          },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small">
      <Spinner
        border={[
          {
            side: 'all',
            color: 'brand',
            size: 'large',
            style: 'groove',
          },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small">
      <Spinner
        border={[
          { side: 'all', color: 'background-contrast', size: 'medium' },
          { side: 'right', color: 'brand', size: 'medium' },
          { side: 'top', color: 'brand', size: 'medium' },
          { side: 'left', color: 'brand', size: 'medium' },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small">
      <Spinner
        border={[{ side: 'horizontal', color: 'brand', size: 'medium' }]}
      />
      <Text>Loading...</Text>
    </Box>
  </Box>
);

export default {
  title: 'Visualizations/Spinner/Border',
};
