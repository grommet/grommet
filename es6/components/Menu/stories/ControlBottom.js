import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';

var ControlBottom = function ControlBottom() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    height: "medium",
    justify: "center",
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Menu, {
    dropProps: {
      align: {
        bottom: 'bottom',
        left: 'left'
      }
    },
    label: "actions",
    items: [{
      label: 'Profile',
      onClick: function onClick() {}
    }, {
      label: 'Settings',
      onClick: function onClick() {}
    }, {
      label: 'FAQ',
      onClick: function onClick() {}
    }]
  })));
};

storiesOf('Menu', module).add('Bottom Control Button', function () {
  return /*#__PURE__*/React.createElement(ControlBottom, null);
}, {
  chromatic: {
    disable: true
  }
});