import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="start" pad="small" gap="medium">
      <Box>
        <Text>Default</Text>
        <Pagination numberItems={237} />
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
  </Grommet>
);

export default {
  title: 'Controls/Pagination/Simple',
};
