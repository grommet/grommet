import React from 'react';
import { Box, Menu } from 'grommet';
import { User } from "grommet-icons/es6/icons/User";
export var Justify = function Justify() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Menu, {
    alignSelf: "start",
    label: "Actions",
    items: [{
      label: 'Hey',
      icon: /*#__PURE__*/React.createElement(User, null),
      justify: 'center'
    }, {
      label: 'Hello',
      icon: /*#__PURE__*/React.createElement(User, null),
      justify: 'end'
    }, {
      label: 'Hii',
      icon: /*#__PURE__*/React.createElement(User, null)
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