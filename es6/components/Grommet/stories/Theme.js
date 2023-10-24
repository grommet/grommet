import React from 'react';
import { Grommet, Anchor, Box } from 'grommet';
import { Add } from "grommet-icons/es6/icons/Add";
var customTheme = {
  global: {
    colors: {
      custom: '#cc6633'
    }
  }
};
export var Theme = function Theme() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    color: "custom"
  })));
};
export default {
  title: 'Utilities/Grommet/Theme'
};