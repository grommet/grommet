import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
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

if (!isChromatic()) {
  storiesOf('InfiniteScroll', module)
    .add('Variable Item Height', () => <Example />)
    .add('Variable Item Height w/replace', () => <Example replace />);
}
