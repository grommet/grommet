import React from 'react';

import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';

export const GradientColorBox = () => (
  <Grommet theme={grommet}>
    <Box
      justify="center"
      align="center"
      pad="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round="large"
    >
      <Text color="white">I have a linear gradient background</Text>
    </Box>
  </Grommet>
);

GradientColorBox.storyName = 'Gradient';

export default {
  title: 'Layout/Box/Gradient',
};
