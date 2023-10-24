import React, { useState } from 'react';
import { Box } from 'grommet';
import { RangeSelector } from '../RangeSelector';
export var Simple = function Simple() {
  var _useState = useState([10, 40]),
    range = _useState[0],
    setRange = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "xlarge"
    }, /*#__PURE__*/React.createElement(RangeSelector, {
      min: 0,
      max: 100,
      values: range,
      onChange: function onChange(nextRange) {
        setRange(nextRange);
      }
    }))
    // </Grommet>
  );
};

export default {
  title: 'Input/RangeSelector/Simple'
};