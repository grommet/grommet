import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import {
  Grommet,
  Box,
  InfiniteScroll,
  InfiniteScrollProps,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';

import { allItems } from '../Basics';

export interface IProps {
  props?: InfiniteScrollProps;
  step?: InfiniteScrollProps['step'];
}

const OnMoreInfiniteScroll: React.FC<IProps> = ({ props }) => {
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

if (!isChromatic()) {
  storiesOf('TypeScript/InfiniteScroll', module)
    .add('onMore', () => <OnMoreInfiniteScroll />)
    .add('onMore step', () => <OnMoreInfiniteScroll step={75} />);
}
