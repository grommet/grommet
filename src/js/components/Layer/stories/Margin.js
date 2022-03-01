import React from 'react';

import { Box, Layer } from 'grommet';

const MarginLayer = ({ margin, ...rest }) => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Layer
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

export const Margin = () => <MarginLayer full />;

export default {
  title: 'Layout/Layer/Margin',
};
