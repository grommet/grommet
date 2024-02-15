import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="medium">
    <Box fill="horizontal">
      <Text>Default</Text>
      <Pagination numberItems={237} stepSelector={[10, 25, 50]} summary />
    </Box>
    <Box>
      <Text>Box Props</Text>
      <Pagination
        numberItems={1237}
        page={24}
        background="brand"
        pad="medium"
        margin="small"
      />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Simple',
};
