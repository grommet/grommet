import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Grid } from 'grommet';
import { grommet } from '../../../themes';

const Example = () => (
  <Grommet theme={grommet}>
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
        ].map(animation => (
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
  </Grommet>
);

storiesOf('Layout | Box', module).add('Animation', () => <Example />);
