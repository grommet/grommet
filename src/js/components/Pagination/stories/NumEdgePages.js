import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const NumEdgePages = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Box>
        <Text>numEdgePages = 2 (number of pages on start/end)</Text>
        <Pagination numItems={237} page={10} numEdgePages={2} />
      </Box>
      <Box>
        <Text>numEdgePages = 0</Text>
        <Pagination numItems={237} page={10} numEdgePages={0} />
      </Box>
    </Box>
  </Grommet>
);
