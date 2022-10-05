import React from 'react';

import { Box, Grid } from 'grommet';

export const Animation = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="medium">
    <Grid columns="small" gap="medium">
      {[
        'fadeIn',
        'fadeOut',
        'jiggle',
        'pulse',
        'rotateRight',
        'rotateLeft',
        'slideUp',
        'slideDown',
        'slideLeft',
        'slideRight',
        'zoomIn',
        'zoomOut',
      ].map((animation) => (
        <Box
          key={animation}
          pad="large"
          background="brand"
          animation={{ type: animation, duration: 4000 }}
          align="center"
        >
          {animation}
        </Box>
      ))}
    </Grid>
  </Box>
  // </Grommet>
);

export default {
  title: 'Layout/Box/Animation',
};
