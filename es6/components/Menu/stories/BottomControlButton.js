import React from 'react';
import { Box, Menu } from 'grommet';
var ControlBottomMenu = function ControlBottomMenu() {
  return /*#__PURE__*/React.createElement(Box, {
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
  }));
};
export var BottomControlButton = function BottomControlButton() {
  return /*#__PURE__*/React.createElement(ControlBottomMenu, null);
};
BottomControlButton.storyName = 'Bottom control button';
BottomControlButton.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Menu/Bottom control button'
};