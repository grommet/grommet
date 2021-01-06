import React from 'react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Pagination } from '../Pagination';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="start" pad="small" gap="medium">
      <Box>
        <Text>Default</Text>
        <Pagination numItems={237} />
      </Box>
      <Box>
        <Text>Box Props</Text>
        <Pagination
          numItems={1237}
          page={24}
          background="brand"
          pad="medium"
          margin="small"
        />
      </Box>
    </Box>
  </Grommet>
);
