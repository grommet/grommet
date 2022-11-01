import React from 'react';
import { Box, Stack, Text } from 'grommet';
import { Cart } from "grommet-icons/es6/icons/Cart";
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Stack, {
      anchor: "top-right"
    }, /*#__PURE__*/React.createElement(Cart, {
      size: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "orange",
      pad: {
        horizontal: 'xsmall'
      },
      round: true
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "4"))))
    // </Grommet>
  );
};

export default {
  title: 'Layout/Stack/Simple'
};