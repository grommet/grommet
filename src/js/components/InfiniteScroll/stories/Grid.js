import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grid, Grommet, Box, Image, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { allItems } from './Basics';

const GridInfiniteScroll = ({ ...rest }) => (
  <Grommet theme={grommet}>
    <Grid columns="xsmall" rows="small">
      <InfiniteScroll items={allItems} step={12} {...rest}>
        {item => (
          <Box key={item} as="article" pad="xsmall">
            <Image src="https://via.placeholder.com/350x150" />
            <Text>{item}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Grid>
  </Grommet>
);

storiesOf('InfiniteScroll', module)
  .add('Grid', () => <GridInfiniteScroll />)
  .add('Grid with show item 77', () => <GridInfiniteScroll show={78} />);
