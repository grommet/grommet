import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const NumberMiddlePages = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="medium">
    <Box>
      <Text>numberMiddlePages = 4 (number of pages in the middle)</Text>
      <Pagination numberItems={237} page={10} numberMiddlePages={4} />
    </Box>
    <Box>
      <Text>numberMiddlePages = 5 (number of pages in the middle)</Text>
      <Pagination numberItems={237} page={10} numberMiddlePages={5} />
    </Box>
  </Box>
  // </Grommet>
);

NumberMiddlePages.storyName = 'Number middle pages';

export default {
  title: 'Controls/Pagination/Number middle pages',
};
