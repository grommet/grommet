import React from 'react';
import { Box, Layer, Text } from 'grommet';
export var PlainLayer = function PlainLayer() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      background: "dark-3"
    }, /*#__PURE__*/React.createElement(Layer, {
      margin: "medium",
      plain: true
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      border: {
        color: 'accent-1',
        size: 'large'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      color: "accent-2"
    }, "Text"))))
    // </Grommet>
  );
};

PlainLayer.storyName = 'Plain';
PlainLayer.args = {
  full: true
};
export default {
  title: 'Layout/Layer/Plain'
};