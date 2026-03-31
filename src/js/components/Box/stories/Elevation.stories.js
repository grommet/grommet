import React from 'react';

import { Box, Text } from 'grommet';

export const ElevationBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" align="start">
    <Box pad="medium" background="dark-1" elevation="medium" gap="medium">
      <Text>dark on white</Text>
      <Box pad="medium" elevation="medium" gap="medium">
        <Text>dark on dark</Text>
        <Box pad="medium" background="light-1" elevation="medium" gap="medium">
          <Text>light on dark</Text>
          <Box pad="medium" elevation="medium">
            <Text>light on light</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
  // </Grommet>
);

ElevationBox.storyName = 'Elevation';

export default {
  title: 'Layout/Box/Elevation',
};
