import React from 'react';
import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    options: ['First', 'Second', 'Third']
  })));
};
export default {
  title: 'Input/CheckBoxGroup/Simple'
};