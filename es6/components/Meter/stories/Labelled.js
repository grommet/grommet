import React from 'react';
import { Box, Meter, Stack, Text } from 'grommet';
export var Labelled = function Labelled() {
  var meterValue = 30;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Stack, {
      anchor: "center"
    }, /*#__PURE__*/React.createElement(Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: meterValue
      }],
      size: "xsmall",
      thickness: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: {
        bottom: 'xsmall'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      size: "xlarge",
      weight: "bold"
    }, meterValue), /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "%"))))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Labelled'
};