import React from 'react';
import { grommet } from 'grommet/themes';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => `item ${i + 1}`);

export const Replace = () => (
  <Grommet theme={grommet}>
    <InfiniteScroll items={allItems} replace>
      {item => (
        <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
          <Text>{item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </Grommet>
);

Replace.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/InfiniteScroll/Replace',
};
