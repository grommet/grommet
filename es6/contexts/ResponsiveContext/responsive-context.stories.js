import React from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';
import { Box, Grommet, Heading, ResponsiveContext } from 'grommet';
var customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 500
      },
      small: {
        value: 900
      },
      medium: undefined,
      middle: {
        value: 3000
      }
    }
  }
});
storiesOf('ResponsiveContext', module).add('Custom Breakpoints', function () {
  return React.createElement(Grommet, {
    theme: customBreakpoints,
    full: true
  }, React.createElement(ResponsiveContext.Consumer, null, function (size) {
    return React.createElement(Box, {
      fill: true,
      background: "brand"
    }, React.createElement(Heading, null, "Hi, I'm " + size + ", resize me!"));
  }));
});