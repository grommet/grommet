import React from 'react';

import { Box, Grid } from 'grommet';

export const BorderGrid = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="small" align="start">
    <Grid pad="small" border>
      true
    </Grid>
    <Box direction="row-responsive" gap="small">
      {['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(
        (border) => (
          <Grid key={border} pad="small" border={border}>
            {border}
          </Grid>
        ),
      )}
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      <Grid
        pad="small"
        border={[
          { size: 'medium', style: 'dotted', side: 'top' },
          {
            size: 'medium',
            style: 'double',
            side: 'vertical',
          },
        ]}
      >
        custom top & vertical borders
      </Grid>
    </Box>
    <Grid pad="small" border={{ color: 'brand' }}>
      color
    </Grid>
    <Box direction="row-responsive" gap="small" align="start">
      {['small', 'medium', 'large'].map((size) => (
        <Grid key={size} pad="small" border={{ size }}>
          {size}
        </Grid>
      ))}
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      {['small', 'medium', 'large'].map((size) => (
        <Grid key={size} pad="small" responsive={false} border={{ size }}>
          {size}
        </Grid>
      ))}
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      {[
        'solid',
        'dashed',
        'dotted',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
      ].map((type) => (
        <Grid key={type} pad="small" border={{ size: 'medium', style: type }}>
          {type}
        </Grid>
      ))}
    </Box>
  </Box>
  // </Grommet>
);

BorderGrid.storyName = 'Border';

export default {
  title: 'Layout/Grid/Border',
};
