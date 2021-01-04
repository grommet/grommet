import React from 'react';
import { grommet } from 'grommet/themes';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => i + 1);

const Example = props => {
  return (
    <Grommet theme={grommet}>
      <Box>
        <InfiniteScroll items={allItems} {...props}>
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
};

export const Height = () => <Example />;
export const HeightReplace = () => <Example replace />;

Height.story = {
  name: 'Variable item height',
  parameters: {
    chromatic: { disable: true },
  },
};

HeightReplace.story = {
  name: 'Variable item height w/replace',
  parameters: {
    chromatic: { disable: true },
  },
};
