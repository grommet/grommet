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

Height.storyName = 'Variable item height';

Height.parameters = {
  chromatic: { disable: true },
};

HeightReplace.storyName = 'Variable item height w/replace';

HeightReplace.parameters = {
  chromatic: { disable: true },
};
