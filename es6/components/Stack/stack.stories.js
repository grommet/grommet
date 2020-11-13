import React from 'react';
import { Grommet, Box, Stack } from 'grommet';
import { grommet } from 'grommet/themes';
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
export var Fill = function Fill() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Stack, {
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
    background: "brand",
    fill: true
  }, "Test")));
};
export default {
  title: 'Layout/Stack'
};