import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import { grommet } from 'grommet/themes';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';

const allItems = Array(240)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const InfiniteScrollReplace = props => (
  <Grommet theme={grommet}>
    <InfiniteScroll items={allItems} {...props}>
      {item => (
        <Box key={item} pad="medium" border={{ side: 'bottom' }} align="center">
          <Text>{item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('InfiniteScroll', module)
    .add('Replace', () => <InfiniteScrollReplace replace />)
    .add('Replace with Show 28th item', () => (
      <InfiniteScrollReplace replace show={27} />
    ))
    .add('Replace with Show 88th item', () => (
      <InfiniteScrollReplace replace show={87} />
    ));
}
