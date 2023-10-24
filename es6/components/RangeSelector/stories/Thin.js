import React, { useState } from 'react';
import { Box, RangeSelector, Stack, Text } from 'grommet';
var RANGE_MIN = 0;
var RANGE_MAX = 100;
function Thin(_ref) {
  var _ref$initialRange = _ref.initialRange,
    initialRange = _ref$initialRange === void 0 ? [0, 100] : _ref$initialRange,
    label = _ref.label;
  var _useState = useState(initialRange),
    range = _useState[0],
    setRange = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    pad: "xlarge"
  }, label ? /*#__PURE__*/React.createElement(Text, null, label) : null, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, {
    background: "light-4",
    height: "6px",
    direction: "row"
  }), /*#__PURE__*/React.createElement(RangeSelector, {
    direction: "horizontal",
    min: RANGE_MIN,
    max: RANGE_MAX,
    step: 1,
    values: range,
    onChange: function onChange(nextRange) {
      setRange(nextRange);
    }
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, range[0] + "% - " + range[1] + "%")));
}
export var ThinStory = function ThinStory() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small"
    }, /*#__PURE__*/React.createElement(Thin, {
      label: "My Range Selector"
    }))
    // </Grommet>
  );
};

ThinStory.storyName = 'Thin';
export default {
  title: 'Input/RangeSelector/Thin'
};