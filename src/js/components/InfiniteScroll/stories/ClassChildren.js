import React from 'react';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

/* eslint-disable react/prefer-stateless-function */
const MyItem = ({ item }) => (
  <Box pad="medium" border={{ side: 'bottom' }} align="center">
    <Text>{item}</Text>
  </Box>
);

export const ClassChildrenInfiniteScroll = props => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
        {item => <MyItem key={item} item={item} />}
      </InfiniteScroll>
    </Box>
  </Grommet>
);

ClassChildrenInfiniteScroll.storyName = 'Class children';

export default {
  title: 'Utilities/InfiniteScroll/Class children',
};
