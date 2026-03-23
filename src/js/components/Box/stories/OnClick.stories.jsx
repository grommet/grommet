import React from 'react';
import { Attraction } from 'grommet-icons';

import { Box, Text } from 'grommet';

export const OnClickBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box justify="center" align="center" pad="large">
    {/* eslint-disable no-alert */}
    <Box
      border
      pad="large"
      align="center"
      round
      gap="small"
      hoverIndicator={{
        background: {
          color: 'background-contrast',
        },
        elevation: 'medium',
      }}
      onClick={() => {
        alert('clicked');
      }}
    >
      <Attraction size="large" />
      <Text>Party</Text>
    </Box>
  </Box>
  // </Grommet>
);

OnClickBox.storyName = 'onClick';

export default {
  title: 'Layout/Box/onClick',
};
