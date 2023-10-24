import React from 'react';
import { Anchor, Box } from 'grommet';
var SizeAnchor = function SizeAnchor() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '10px'].map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/React.createElement(Anchor, {
      size: size,
      label: size,
      href: "#"
    }));
  }));
};
export var Size = function Size() {
  return /*#__PURE__*/React.createElement(SizeAnchor, null);
};
export default {
  title: 'Controls/Anchor/Size'
};