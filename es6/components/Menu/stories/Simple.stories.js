import React from 'react';
import { Box, Menu } from 'grommet';
var SimpleMenu = function SimpleMenu() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Menu, {
    dropProps: {
      a11yTitle: 'Simple drop content',
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
  }));
};
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleMenu, null);
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Menu/Simple'
};