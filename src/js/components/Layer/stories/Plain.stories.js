import React from 'react';

import { Box, Layer, Text } from 'grommet';

export const PlainLayer = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill background="dark-3">
    <Layer margin="medium" plain>
      <Box pad="large" border={{ color: 'accent-1', size: 'large' }}>
        <Text color="accent-2">Text</Text>
      </Box>
    </Layer>
  </Box>
  // </Grommet>
);

PlainLayer.storyName = 'Plain';

PlainLayer.args = {
  full: true,
};

export default {
  title: 'Layout/Layer/Plain',
};
