import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';
import { Box, InfiniteScroll, Text } from 'mnet-ui-base';

export const allItems = Array(3) // (2000)
  .fill(0)
  .map((_, i) => `item ${i + 1}`);

const Example = props => (
  <React.StrictMode>
    <>
      <Box>
        <InfiniteScroll items={allItems} {...props}>
          {(item, _, ref) => (
            <Box
              ref={ref}
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
    </>
  </React.StrictMode>
);

if (!isChromatic()) {
  storiesOf('TypeScript/InfiniteScroll', module).add('Basic', () => (
    <Example />
  ));
}
