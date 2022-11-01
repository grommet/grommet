import React from 'react';
import { Box, Text } from 'grommet';
export var GradientColorBox = function GradientColorBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      justify: "center",
      align: "center",
      pad: "xlarge",
      background: "linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)",
      round: "large"
    }, /*#__PURE__*/React.createElement(Text, {
      color: "white"
    }, "I have a linear gradient background"))
    // </Grommet>
  );
};

GradientColorBox.storyName = 'Gradient';
export default {
  title: 'Layout/Box/Gradient'
};