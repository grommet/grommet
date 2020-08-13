import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { FormUp } from "grommet-icons/es6/icons/FormUp";
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  menu: {
    icons: {
      down: FormDown,
      up: FormUp
    }
  }
});

var Themed = function Themed() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Menu, {
    dropProps: {
      align: {
        top: 'bottom',
        left: 'left'
      },
      elevation: 'xlarge'
    },
    label: "actions",
    items: [{
      label: 'Launch',
      onClick: function onClick() {}
    }, {
      label: 'Abort',
      onClick: function onClick() {}
    }, {
      label: 'Disabled',
      disabled: true
    }]
  })));
};

storiesOf('Menu', module).add('Themed', function () {
  return /*#__PURE__*/React.createElement(Themed, null);
}, {
  chromatic: {
    disable: true
  }
});