import React from 'react';

import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';

export const NColumnGrid = () => (
  <Grommet theme={grommet} full>
    <Grid
      columns={{
        count: 6,
        size: 'auto',
      }}
      gap="small"
    >
      <Box background="brand">Item 1</Box>
      <Box background="brand">Item 2</Box>
      <Box background="brand">Item 3</Box>
      <Box background="brand">Item 4</Box>
      <Box background="brand">Item 5</Box>
      <Box background="brand">Item 6</Box>
    </Grid>
  </Grommet>
);

NColumnGrid.storyName = 'N-column layout';

export default {
  title: 'Layout/Grid/N-column layout',
};
