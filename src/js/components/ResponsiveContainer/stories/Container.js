import React from 'react';

import { Box, Text } from 'grommet';
import { ResponsiveContainer } from '../ResponsiveContainer';

export const Container = () => (
  <Box direction="row" gap="medium" pad="medium">
    <ResponsiveContainer fill background="yellow">
      <Box direction="row-responsive" gap="medium">
        <Text>Left hand side</Text>
        <Text>Item 2</Text>
      </Box>
    </ResponsiveContainer>
    <Box width="small" height="small" background="green">
      <Text>Right hand side</Text>
    </Box>
  </Box>
);

Container.storyName = 'Responsive container';

export default {
  title: `Layout/Box/Responsive container`,
};
