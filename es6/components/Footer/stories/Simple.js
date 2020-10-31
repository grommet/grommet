import React from 'react';
import { Box, Footer, grommet, Grommet, Main, Text } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Main, {
    background: "light-2",
    elevation: "large",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/React.createElement(Box, {
    flex: true
  })), /*#__PURE__*/React.createElement(Footer, {
    background: "light-4",
    justify: "center",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    textAlign: "center",
    size: "small"
  }, "\xA9 2019 Copyright Grommet")));
};