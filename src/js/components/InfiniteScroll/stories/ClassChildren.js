import React from 'react';

import { Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

/* eslint-disable react/prefer-stateless-function */
const MyItem = ({ item }) => (
  <Box pad="medium" border={{ side: 'bottom' }} align="center">
    <Text>{item}</Text>
  </Box>
);

export const ClassChildrenInfiniteScroll = (props) => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <InfiniteScroll items={allItems} {...props}>
      {(item) => <MyItem key={item} item={item} />}
    </InfiniteScroll>
  </Box>
  // </Grommet>
);

ClassChildrenInfiniteScroll.storyName = 'Class children';

export default {
  title: 'Utilities/InfiniteScroll/Class children',
};
