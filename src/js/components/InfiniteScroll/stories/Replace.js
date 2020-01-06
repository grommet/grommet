import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';
import { mnet } from 'mnet-ui-base/themes';

import { MnetUIBase, Box, InfiniteScroll, Text } from 'mnet-ui-base';

const allItems = Array(240)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const InfiniteScrollReplace = props => (
  <MnetUIBase theme={mnet}>
    <InfiniteScroll items={allItems} {...props}>
      {item => (
        <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
          <Text>{item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('InfiniteScroll', module).add('Replace', () => (
    <InfiniteScrollReplace replace />
  ));
}
