import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Steps = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="xlarge">
    <Box fill="horizontal">
      <Text>summary and stepSelector</Text>
      <Pagination numberItems={237} stepOptions summary />
    </Box>
    <Box fill="horizontal">
      <Text>stepOptions with custom steps</Text>
      <Pagination numberItems={237} stepOptions={[10, 20, 30, 1000]} summary />
    </Box>
    <Box fill="horizontal">
      <Text> stepOptions as boolean</Text>
      <Pagination numberItems={237} stepOptions />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Steps',
};
