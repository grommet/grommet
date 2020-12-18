import React from 'react';

import { Grid, Grommet, Box, Image, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

export const GridInfiniteScroll = ({ ...rest }) => (
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

export const GridWithShow = () => <GridInfiniteScroll show={78} />;

GridInfiniteScroll.storyName = 'Grid';

GridWithShow.storyName = 'Grid with show item 77';
