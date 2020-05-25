import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grid, Box, Image, InfiniteScroll, Text } from 'mnet-ui-base';

import { allItems } from './Basics';

const GridInfiniteScroll = () => (
  <>
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
  </>
);

storiesOf('InfiniteScroll', module).add('Grid', () => <GridInfiniteScroll />);
