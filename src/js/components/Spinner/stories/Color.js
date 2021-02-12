import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';

export const Color = () => (
  <Grommet theme={grommet} full>
    <Box gap="large" pad="small">
      {[1, 2, 3, 4].map(color => (
        <Box align="center" direction="row" gap="small">
          <Spinner color={`graph-${color}`} />
          <Text>Loading...</Text>
        </Box>
      ))}
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Color',
};
