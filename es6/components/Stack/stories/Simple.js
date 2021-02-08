import React from 'react';
import { Grommet, Box, Stack } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
    anchor: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    background: "neutral-1"
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: "accent-1"
  })));
};
export default {
  title: 'Layout/Stack/Simple'
};