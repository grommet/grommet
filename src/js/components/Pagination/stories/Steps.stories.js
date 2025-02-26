import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Steps = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="xlarge">
    <Box fill="horizontal">
      <Text>Pagination with stepOptions</Text>
      <Pagination
        aria-label="Pagination with step options to change items per page"
        numberItems={237}
        stepOptions
      />
    </Box>
    <Box fill="horizontal">
      <Text>Pagination with stepOptions and summary</Text>
      <Pagination
        aria-label="Pagination with step options and summary of items per page"
        numberItems={237}
        stepOptions
        summary
      />
    </Box>
    <Box fill="horizontal">
      <Text>Pagination with custom step sizes</Text>
      <Pagination
        aria-label="Pagination with custom step sizes and summary"
        numberItems={237}
        stepOptions={[10, 20, 30, 1000]}
        summary
      />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Steps',
};
