import React from 'react';

import { Box, Grommet, Heading, ResponsiveContext } from 'grommet';

const customBreakpoints = {
  global: {
    breakpoints: {
      xsmall: {
        value: 375,
      },
      small: {
        value: 568,
        edgeSize: {
          none: '0px',
          small: '6px',
          medium: '12px',
          large: '24px',
        },
      },
      medium: {
        value: 768,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
      large: {
        value: 1024,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
      xlarge: {
        value: 1366,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
    },
  },
};

export const CustomBreakpoints = () => (
  <Grommet theme={customBreakpoints} full>
    <ResponsiveContext.Consumer>
      {size => (
        <Box fill background="brand">
          <Heading>{`Hi, I'm ${size}, resize me!`}</Heading>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Grommet>
);

CustomBreakpoints.storyName = 'Custom breakpoints';

export default {
  title: 'Utilities/ResponsiveContext/Custom breakpoints',
};
