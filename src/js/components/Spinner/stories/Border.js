import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';

export const Border = () => (
  <Grommet theme={grommet} full>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner
        border={[
          { side: 'all', color: 'transparent', size: 'medium' },
          { side: 'horizontal', color: 'brand', size: 'medium' },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner
        border={[
          {
            side: 'all',
            color: 'brand',
            // size: 'small',
            style: 'dotted',
          },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner
        border={[
          {
            side: 'horizontal',
            color: 'brand',
            size: 'large',
            // style: 'inset',
          },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner
        border={[
          {
            side: 'all',
            color: 'brand',
            // size: 'large',
            style: 'groove',
          },
        ]}
      />
      <Text>Loading...</Text>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Border',
};
