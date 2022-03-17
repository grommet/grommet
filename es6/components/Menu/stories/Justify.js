import React from 'react';
import { Box, Menu } from 'grommet';
import { Home } from "grommet-icons/es6/icons/Home";
import { User } from "grommet-icons/es6/icons/User";
export var Justify = function Justify() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Menu, {
    alignSelf: "start",
    label: "Actions",
    items: [{
      label: 'User',
      icon: /*#__PURE__*/React.createElement(User, null),
      justify: 'center'
    }, {
      label: 'Users',
      icon: /*#__PURE__*/React.createElement(User, null),
      justify: 'end'
    }, {
      label: 'Home',
      icon: /*#__PURE__*/React.createElement(Home, null)
    }]
  }));
};
Justify.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Menu/Justify'
};