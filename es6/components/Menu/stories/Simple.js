import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleMenu = function SimpleMenu() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
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

storiesOf('Menu', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(SimpleMenu, null);
}, {
  chromatic: {
    disable: true
  }
});