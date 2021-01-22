import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const NumMiddlePages = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Box>
        <Text>numMiddlePages = 4 (number of pages in the middle)</Text>
        <Pagination numItems={237} page={10} numMiddlePages={4} />
      </Box>
      <Box>
        <Text>numMiddlePages = 5 (number of pages in the middle)</Text>
        <Pagination numItems={237} page={10} numMiddlePages={5} />
      </Box>
    </Box>
  </Grommet>
);
