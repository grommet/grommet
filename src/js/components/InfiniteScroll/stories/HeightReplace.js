import React from 'react';
import { grommet } from 'grommet/themes';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => i + 1);

export const HeightReplace = () => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={allItems} replace>
        {item => (
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
  </Grommet>
);

HeightReplace.storyName = 'Variable item height with replace';

HeightReplace.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/InfiniteScroll/Variable item height with replace',
};
