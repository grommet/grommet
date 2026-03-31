import React from 'react';

import { Box, Grid } from 'grommet';

export const Percentages = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid
    fill
    areas={[
      { name: 'nav', start: [0, 0], end: [0, 0] },
      { name: 'main', start: [1, 0], end: [1, 0] },
    ]}
    columns={['small', 'flex']}
    rows={['flex']}
    gap="small"
  >
    <Box gridArea="nav" background="brand" />
    <Box gridArea="main" background="brand" />
  </Grid>
  // </Grommet>
);

Percentages.args = {
  full: true,
};

export default {
  title: 'Layout/Grid/Percentages',
};
