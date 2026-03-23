import React from 'react';

import { Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const Example = (props) => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <InfiniteScroll items={allItems} {...props}>
    {(item) => (
      <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
        <Text>{item}</Text>
      </Box>
    )}
  </InfiniteScroll>
  // </Grommet>
);

export const ShowAfter = () => <Example replace show={87} />;

ShowAfter.storyName = 'Replace, show after step';

ShowAfter.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/InfiniteScroll/Replace, show after step',
};
