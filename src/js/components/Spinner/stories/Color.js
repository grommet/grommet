import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';

export const Color = () => (
  <Grommet theme={grommet} full>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner color="green" />
      <Text>Loading...</Text>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Color',
};
