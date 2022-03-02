import React from 'react';

import { Box, Layer } from 'grommet';

const MarginLayer = ({ margin, ...rest }) => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Layer
    id="Margin top center"
    margin={
      margin || { left: '40px', top: '50px', right: '30px', bottom: '10px' }
    }
    {...rest}
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

export const MarginTopCenter = () => (
  <MarginLayer margin={{ top: 'large' }} position="top" />
);
MarginTopCenter.storyName = 'Margin top (center)';

MarginTopCenter.args = {
  options: {
    layer: {
      singleId: true,
    },
  },
};

export default {
  title: 'Layout/Layer/Margin top (center)',
};
