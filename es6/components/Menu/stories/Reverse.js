import React from 'react';
import { Grommet, Box, Menu } from 'grommet';
import { Power } from "grommet-icons/es6/icons/Power";
import { User } from "grommet-icons/es6/icons/User";
import { grommet } from 'grommet/themes';

var ReverseMenu = function ReverseMenu() {
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
      }
    },
    label: "actions",
    items: [{
      label: 'Home'
    }, {
      label: 'Profile',
      icon: /*#__PURE__*/React.createElement(User, null),
      gap: 'small'
    }, {
      label: 'Logout',
      icon: /*#__PURE__*/React.createElement(Power, null),
      reverse: true,
      gap: 'small'
    }]
  })));
};

export var Reverse = function Reverse() {
  return /*#__PURE__*/React.createElement(ReverseMenu, null);
};
Reverse.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Menu/Reverse'
};