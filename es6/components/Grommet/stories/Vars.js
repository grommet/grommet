import React from 'react';
import { grommet, Grommet, Box } from 'grommet';
export var Vars = function Vars() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    cssVars: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    background: "var(--accent-2)",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, null, "Checkout Grommet variables, you can find them in the StyledGrommet DOM."), /*#__PURE__*/React.createElement(Box, {
    "with": true
  }, "For example, the background color in this Box is using var(--accent-2)")));
};
export default {
  title: 'Utilities/Grommet/Vars'
};