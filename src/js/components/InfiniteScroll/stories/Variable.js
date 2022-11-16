import React from 'react';

import { Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => i + 1);

export const Height = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <InfiniteScroll items={allItems}>
      {(item) => (
        <Box
          key={item}
          height={item <= 25 ? 'xsmall' : 'xxsmall'}
          pad="medium"
          border={{ side: 'bottom' }}
          align="center"
        >
          <Text>item {item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </Box>
  // </Grommet>
);

Height.storyName = 'Variable item height';

Height.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/InfiniteScroll/Variable item height',
};
