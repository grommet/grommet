import React from 'react';
import { Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Color = function Color() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Text, {
    color: "accent-1"
  }, "Colored Text"));
};