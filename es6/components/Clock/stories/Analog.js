import React from 'react';
import { Box, Clock, Text } from 'grommet';
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'huge'];
export var Analog = function Analog() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
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
    }, /*#__PURE__*/React.createElement(Text, null, "xxlarge and huge sizes are equal. The latter is kept for beckwards compatibility.")))
    // </Grommet>
  );
};

Analog.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Clock/Analog'
};