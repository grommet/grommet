import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, InfiniteScroll, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { allItems } from './Basics';

const OnMoreInfiniteScroll = ({ props }) => {
  const [items, setItems] = useState(allItems.slice(0, 50));

  const onMore = () => {
    setTimeout(() => {
      setItems(allItems.slice(0, items.length + 50));
    }, 1000);
  };

  return (
    <MnetUIBase theme={mnet}>
      <Box>
        <InfiniteScroll items={items} onMore={onMore} {...props}>
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
    </MnetUIBase>
  );
};

storiesOf('InfiniteScroll', module)
  .add('onMore', () => <OnMoreInfiniteScroll />)
  .add('onMore step', () => <OnMoreInfiniteScroll step={75} />);
