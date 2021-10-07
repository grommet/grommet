import React from 'react';
import { grommet } from 'grommet/themes';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const Example = props => (
  <Grommet theme={grommet}>
    <InfiniteScroll items={allItems} {...props}>
      {item => (
        <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
          <Text>{item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </Grommet>
);

export const ShowBefore = () => <Example replace show={27} />;

ShowBefore.storyName = 'Replace, show before step';

ShowBefore.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/InfiniteScroll/Replace, show before step',
};
