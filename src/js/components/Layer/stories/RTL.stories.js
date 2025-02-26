import React from 'react';

import { Box, Layer } from 'grommet';

export const RTLLayer = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Layer
    position="start"
    margin={{ vertical: 'small', start: 'xlarge', end: 'medium' }}
  >
    <Box height="small" overflow="auto">
      <Box pad="xlarge">text</Box>
      <Box pad="xlarge">text</Box>
      <Box pad="xlarge">text</Box>
      <Box pad="xlarge">text</Box>
      <Box pad="xlarge">text</Box>
      <Box pad="xlarge">text</Box>
    </Box>
  </Layer>
  // </Grommet>
);

RTLLayer.storyName = 'RTL';

RTLLayer.args = {
  dir: 'rtl',
};

export default {
  title: 'Layout/Layer/RTL',
};
