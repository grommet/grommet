import React from 'react';

import { Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => `item ${i + 1}`);

export const Replace = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <InfiniteScroll items={allItems} replace>
    {(item) => (
      <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
        <Text>{item}</Text>
      </Box>
    )}
  </InfiniteScroll>
  // </Grommet>
);

Replace.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/InfiniteScroll/Replace',
};
