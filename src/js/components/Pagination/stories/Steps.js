import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Steps = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="xlarge">
    <Box fill="horizontal">
      <Text>summary and stepSelector</Text>
      <Pagination numberItems={237} stepSelector summary />
    </Box>
    <Box fill="horizontal">
      <Text>custom steps</Text>
      <Pagination numberItems={237} stepSelector={[10, 20, 30]} summary />
    </Box>
    <Box fill="horizontal">
      <Text> stepSelector</Text>
      <Pagination numberItems={237} stepSelector />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Steps',
};
