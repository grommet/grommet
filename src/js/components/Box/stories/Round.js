import React from 'react';

import { Box, Grid } from 'grommet';

export const RoundBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="small">
    <Box pad="small" background="brand" round alignSelf="start">
      true
    </Box>
    <Grid columns="small" gap="small">
      {['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map((size) => (
        <Box key={size} pad="large" background="brand" round={{ size }}>
          {size}
        </Box>
      ))}
    </Grid>
    <Grid columns="small" gap="small">
      {['large', 'xlarge', 'full'].map((size) => (
        <Box
          responsive={false}
          key={size}
          pad="large"
          background="dark-4"
          round={{ size }}
        >
          {size} - Not responsive
        </Box>
      ))}
    </Grid>
    <Grid columns="small" gap="small">
      {[
        'left',
        'top',
        'right',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].map((corner) => (
        <Box key={corner} pad="small" background="brand" round={{ corner }}>
          {corner}
        </Box>
      ))}
      <Box
        background="brand"
        pad="small"
        round={{ corner: 'left', size: '15px' }}
      >
        left rounded corner px value
      </Box>
    </Grid>
  </Box>
  // </Grommet>
);

RoundBox.storyName = 'Round';

export default {
  title: 'Layout/Box/Round',
};
