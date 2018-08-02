import React from 'react';
import { storiesOf } from '@storybook/react';

import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Grommet from '../Grommet/Grommet';
import Box from '../Box/Box';
import Text from '../Text/Text';

const items = Array(200).fill().map((_, i) => `item ${i + 1}`);

const SimpleInfiniteScroll = props => (
  <Grommet>
    <Box>
      <InfiniteScroll items={items} {...props}>
        {item => (
          <Box key={item} pad='medium' border={{ side: 'bottom' }} align='center'>
            <Text>{item}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  </Grommet>
);

storiesOf('InfiniteScroll', module)
  .add('Simple', () => <SimpleInfiniteScroll />)
  .add('Show 118th item', () => <SimpleInfiniteScroll show={117} />);
