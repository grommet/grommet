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
    disabled: {
      color: 'orange',
      border: {
        color: 'orange'
      },
      extend: "border: 10px dashed red;"
    },
    padding: {
      vertical: '12px',
      horizontal: '24px'
    },
    primary: {
      color: '#2196f3',
      active: {
        border: {
          color: 'red'
        },
        extend: "background: cadetblue;"
      },
      extend: "background: skyblue; border: 5px dotted green;"
    },
    extend: function extend(props) {
      var extraStyles = '';

      if (props.primary) {
        extraStyles = "\n            text-transform: uppercase;\n          ";
      }

      return "\n          font-size: 12px;\n          font-weight: bold;\n          " + extraStyles + "\n        ";
    }
  }
};
var coloredButton = {
  button: {
    border: {
      color: 'accent-1'
    },
    color: {
      dark: 'accent-1',
      light: 'dark-2'
    },
    primary: {
      color: 'neutral-2'
    }
  }
};

var CustomTheme = function CustomTheme() {
  return React.createElement(React.Fragment, null, React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center",
    justify: "center",
    pad: "large",
    direction: "row",
    gap: "small"
  }, React.createElement(Button, {
    label: "custom theme",
    onClick: function onClick() {},
    primary: true
  }), React.createElement(Button, {
    label: "custom active primary",
    onClick: function onClick() {},
    primary: true,
    active: true
  }), React.createElement(Button, {
    label: "primary disabled",
    onClick: function onClick() {},
    primary: true,
    disabled: true
  }), React.createElement(Button, {
    label: "Disabled",
    onClick: function onClick() {},
    disabled: true
  }), React.createElement(Button, {
    label: "Plain Disabled",
    onClick: function onClick() {},
    plain: true,
    disabled: true
  }))), React.createElement(Grommet, {
    theme: coloredButton
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    as: "span",
    label: "theme on dark background",
    primary: true
  }))), React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    as: "span",
    label: "Custom as=span"
  }))));
};

storiesOf('Button', module).add('Custom', function () {
  return React.createElement(CustomTheme, null);
});