import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="medium">
    <Box>
      <Text>Default</Text>
      <Pagination
        aria-label="Pagination with default settings"
        numberItems={237}
      />
    </Box>
    <Box>
      <Text>Box Props</Text>
      <Pagination
        numberItems={1237}
        page={24}
        background="dark-1"
        pad="medium"
        margin="small"
        aria-label="Pagination with custom background and spacing"
      />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Simple',
};
