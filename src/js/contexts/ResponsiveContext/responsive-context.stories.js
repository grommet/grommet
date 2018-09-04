import React from 'react';
import { storiesOf } from '@storybook/react';

import { deepMerge } from '../../utils';
import { grommet } from '../../themes';

import { Box, Grommet, Heading, ResponsiveContext } from '../../';

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      medium: 800,
    },
  },
});

storiesOf('ResponsiveContext', module)
  .add('Custom Breakpoints', () => (
    <Grommet theme={customBreakpoints} full={true}>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill={true} background='brand'>
            <Heading>Hi, I&#39;m {size}, resize me!</Heading>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  ));
