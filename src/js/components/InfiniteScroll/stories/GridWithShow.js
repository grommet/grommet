import React from 'react';

import { Grid, Box, Image, InfiniteScroll, Text } from 'grommet';

const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

export const GridWithShow = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid columns="xsmall" rows="small">
    <InfiniteScroll items={allItems} step={12} show={78}>
      {(item) => (
        <Box key={item} as="article" pad="xsmall">
          <Image
            src="https://via.placeholder.com/350x150"
            alt="Placeholder Image"
          />
          <Text>{item}</Text>
        </Box>
      )}
    </InfiniteScroll>
  </Grid>
  // </Grommet>
);

GridWithShow.storyName = 'Grid with show item 77';

export default {
  title: 'Utilities/InfiniteScroll/Grid with show item 77',
};
