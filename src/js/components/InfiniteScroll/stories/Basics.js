import React from 'react';

import { Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

export const Simple = (props) => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <InfiniteScroll items={allItems} {...props}>
      {(item) => (
        <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
          <Text>{item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </Box>
  // </Grommet>
);

export default {
  title: 'Utilities/InfiniteScroll/Simple',
};
