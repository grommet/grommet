import React from 'react';
import { Box, Grommet, Clock, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'huge'];
export var Analog = function Analog() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "small",
    pad: "large"
  }, sizes.map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      key: size,
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, size), /*#__PURE__*/React.createElement(Clock, {
      type: "analog",
      size: size
    }));
  })), /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, null, "xxlarge and huge sizes are equal. The latter is kept for beckwards compatibility.")));
};
Analog.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};