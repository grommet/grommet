import React from 'react';

import { Box, Spinner, Text } from 'grommet';

export const Simple = () => (
  <Box align="center" direction="row" gap="small" pad="small">
    <Spinner />
    <Text>Loading...</Text>
  </Box>
);

export default {
  title: 'Visualizations/Spinner/Simple',
};
