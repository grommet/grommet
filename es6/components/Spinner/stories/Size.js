import React from 'react';
import { grommet, Box, Grommet, Spinner, Text } from 'grommet';
export var Size = function Size() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge'].map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      align: "center",
      direction: "row",
      gap: "small",
      pad: "small",
      key: size
    }, /*#__PURE__*/React.createElement(Spinner, {
      size: size
    }), /*#__PURE__*/React.createElement(Text, {
      size: size
    }, size));
  }));
};
export default {
  title: 'Visualizations/Spinner/Size'
};