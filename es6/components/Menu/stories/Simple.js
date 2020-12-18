import React from 'react';
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

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleMenu, null);
};
Simple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};