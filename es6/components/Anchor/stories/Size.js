import React from 'react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var SizeAnchor = function SizeAnchor() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/React.createElement(Anchor, {
      size: size,
      label: size,
      href: "#"
    }));
  })));
};

export var Size = function Size() {
  return /*#__PURE__*/React.createElement(SizeAnchor, null);
};