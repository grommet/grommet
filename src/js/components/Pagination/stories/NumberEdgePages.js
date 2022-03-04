import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const NumberEdgePages = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="medium">
    <Box>
      <Text>numberEdgePages = 2 (number of pages on start/end)</Text>
      <Pagination numberItems={237} page={10} numberEdgePages={2} />
    </Box>
    <Box>
      <Text>numberEdgePages = 0</Text>
      <Pagination numberItems={237} page={10} numberEdgePages={0} />
    </Box>
  </Box>
  // </Grommet>
);

NumberEdgePages.storyName = 'Number edge pages';

export default {
  title: 'Controls/Pagination/Number edge pages',
};
