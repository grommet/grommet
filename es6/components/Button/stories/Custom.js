import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet } from 'grommet';
var customTheme = {
  global: {
    font: {
      family: 'Arial'
    }
  },
  button: {
    border: {
      radius: undefined,
      color: '#2196f3'
    },
    padding: {
      vertical: '12px',
      horizontal: '24px'
    },
    primary: {
      color: '#2196f3'
    },
    extend: function extend(props) {
      var extraStyles = '';

      if (props.primary) {
        extraStyles = "\n            text-transform: uppercase;\n          ";
      }

      return "\n          color: white;\n          font-size: 12px;\n          font-weight: bold;\n  \n          " + extraStyles + "\n        ";
    }
  }
};

var CustomTheme = function CustomTheme() {
  return React.createElement(React.Fragment, null, React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    label: "custom theme",
    onClick: function onClick() {},
    primary: true
  }))), React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    as: "span",
    label: "Custom as=span",
    path: "/"
  }))));
};

storiesOf('Button', module).add('Custom', function () {
  return React.createElement(CustomTheme, null);
});