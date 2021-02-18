import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';

export const Animation = () => (
  <Grommet theme={grommet} full>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner />
      <Text>Under construction</Text>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Animation',
};
