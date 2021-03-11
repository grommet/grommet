import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';

export const Simple = () => (
  <Grommet theme={grommet} full>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner />
      <Text>Loading...</Text>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Spinner/Simple',
};
