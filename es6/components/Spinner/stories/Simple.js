import React from 'react';
import { grommet, Box, Grommet, Spinner, Text } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Spinner, null), /*#__PURE__*/React.createElement(Text, null, "Loading...")));
};
export default {
  title: 'Visualizations/Spinner/Simple'
};