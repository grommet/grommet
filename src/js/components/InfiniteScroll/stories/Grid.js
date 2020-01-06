import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Grid,
  MnetUIBase,
  Box,
  Image,
  InfiniteScroll,
  Text,
} from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { allItems } from './Basics';

const GridInfiniteScroll = () => (
  <MnetUIBase theme={mnet}>
    <Grid columns="xsmall" rows="small">
      <InfiniteScroll items={allItems} step={12}>
        {item => (
          <Box key={item} as="article" pad="xsmall">
            <Image src="https://via.placeholder.com/350x150" />
            <Text>{item}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Grid>
  </MnetUIBase>
);

storiesOf('InfiniteScroll', module).add('Grid', () => <GridInfiniteScroll />);
