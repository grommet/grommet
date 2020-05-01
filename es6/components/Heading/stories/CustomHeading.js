import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customlevel = deepMerge(grommet, {
  heading: {
    level: {
      5: {
        small: {
          size: '12px',
          height: '16px'
        },
        medium: {
          size: '14px',
          height: '18px'
        },
        large: {
          size: '16px',
          height: '20px'
        }
      }
    },
    extend: function extend(props) {
      return "color: " + props.theme.global.colors.brand;
    }
  }
});

var CustomHeading = function CustomHeading() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customlevel
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 5,
    size: "small"
  }, "Heading level 5 small"), /*#__PURE__*/React.createElement(Heading, {
    level: 5,
    size: "medium"
  }, "Heading level 5 small"), /*#__PURE__*/React.createElement(Heading, {
    level: 5,
    size: "large"
  }, "Heading level 5 small"));
};

storiesOf('Heading', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(CustomHeading, null);
});