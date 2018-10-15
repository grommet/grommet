import React from 'react';
import { storiesOf } from '@storybook/react';

import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

import {
  Box, Grommet, Heading, ResponsiveContext,
} from 'grommet';

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 900,
      },
      medium: undefined,
      middle: {
        value: 3000,
      },
    },
  },
});

storiesOf('ResponsiveContext', module)
  .add('Custom Breakpoints', () => (
    <Grommet theme={customBreakpoints} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill background='brand'>
            <Heading>
              {`Hi, I'm ${size}, resize me!`}
            </Heading>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  ));
