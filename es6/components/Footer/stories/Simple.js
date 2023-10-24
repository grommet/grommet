import React from 'react';
import { Box, Footer, Main, Text } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Main, {
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
    }, "\xA9 2019 Copyright Grommet")))
    // </Grommet>
  );
};

export default {
  title: 'Layout/Footer/Simple'
};