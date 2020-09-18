import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import { grommet } from 'grommet/themes';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';

// import { allItems } from './Basics';
const allItems = Array(240)
  .fill()
  .map((_, i) => i + 1);

const ItemHeights = props => {
  const [items, setItems] = useState(allItems.slice(0, 50));

  const onMore = () => {
    setTimeout(() => {
      setItems(allItems.slice(0, items.length + 50));
    }, 1000);
  };

  return (
    <Grommet theme={grommet}>
      <Box>
        <InfiniteScroll items={items} onMore={onMore} {...props}>
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

if (!isChromatic()) {
  storiesOf('InfiniteScroll', module)
    .add('Variable Item Height', () => <ItemHeights />)
    .add('Variable Item Height w/replace', () => <ItemHeights replace />);
}
