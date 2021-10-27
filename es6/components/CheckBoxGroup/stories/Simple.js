import React from 'react';
import { Box, CheckBoxGroup } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    options: ['First', 'Second', 'Third']
  }));
};
export default {
  title: 'Input/CheckBoxGroup/Simple'
};