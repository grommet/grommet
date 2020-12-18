import React from 'react';
import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';
export var GradientColorBox = function GradientColorBox() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)",
    round: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "white"
  }, "I have a linear gradient background")));
};
GradientColorBox.story = {
  name: 'Gradient'
};