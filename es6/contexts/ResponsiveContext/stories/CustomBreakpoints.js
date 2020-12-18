import React from 'react';
import { Box, Grommet, Heading, ResponsiveContext } from 'grommet';
var customBreakpoints = {
  global: {
    breakpoints: {
      xsmall: {
        value: 375
      },
      small: {
        value: 568,
        edgeSize: {
          none: '0px',
          small: '6px',
          medium: '12px',
          large: '24px'
        }
      },
      medium: {
        value: 768,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px'
        }
      },
      large: {
        value: 1024,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px'
        }
      },
      xlarge: {
        value: 1366,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px'
        }
      }
    }
  }
};
export var CustomBreakpoints = function CustomBreakpoints() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customBreakpoints,
    full: true
  }, /*#__PURE__*/React.createElement(ResponsiveContext.Consumer, null, function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      fill: true,
      background: "brand"
    }, /*#__PURE__*/React.createElement(Heading, null, "Hi, I'm " + size + ", resize me!"));
  }));
};
CustomBreakpoints.story = {
  name: 'Custom breakpoints'
};