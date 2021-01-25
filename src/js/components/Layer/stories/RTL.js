import React from 'react';

import { Box, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';

export const RTLLayer = () => (
  <Grommet theme={grommet} dir="rtl">
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
  </Grommet>
);

RTLLayer.storyName = 'RTL';

export default {
  title: 'Layout/Layer/RTL',
};
