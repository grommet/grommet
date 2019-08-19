import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { allItems } from './Basics';

const LazyInfiniteScroll = () => {
  const [items, setItems] = useState(allItems.slice(0, 200));

  const onMore = () => {
    setTimeout(() => {
      setItems(allItems.slice(0, items.length + 200));
    }, 1000);
  };

  return (
    <Grommet theme={grommet}>
      <Box>
        <InfiniteScroll items={items} onMore={onMore}>
          {item => (
            <Box
              key={item}
              pad="medium"
              border={{ side: 'bottom' }}
              align="center"
            >
              <Text>{item}</Text>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </Grommet>
  );
};

storiesOf('InfiniteScroll', module).add('onMore', () => <LazyInfiniteScroll />);
