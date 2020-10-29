import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const Example = props => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
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

storiesOf('InfiniteScroll', module)
  .add('Simple', () => <Example />)
  .add('Show 118th item', () => <Example show={117} />)
  .add('Marker', () => (
    <Example
      renderMarker={marker => (
        <Box pad="medium" background="accent-1">
          {marker}
        </Box>
      )}
    />
  ));
