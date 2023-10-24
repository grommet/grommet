import React, { useState } from 'react';
import { Box, FormField } from 'grommet';
import { RangeSelector } from '../RangeSelector';
export var Label = function Label() {
  var _useState = useState([0, 100]),
    range = _useState[0],
    setRange = _useState[1];
  var _useState2 = useState([0, 100]),
    range2 = _useState2[0],
    setRange2 = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "xlarge",
      align: "center"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(FormField, {
      name: "range",
      htmlFor: "range",
      label: "Range"
    }, /*#__PURE__*/React.createElement(RangeSelector, {
      id: "range",
      min: 0,
      max: 100,
      label: true,
      values: range,
      onChange: function onChange(nextRange) {
        setRange(nextRange);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      name: "range2",
      htmlFor: "range2",
      label: "Range units"
    }, /*#__PURE__*/React.createElement(RangeSelector, {
      id: "range2",
      min: 0,
      max: 100,
      label: function label(value) {
        return value + "%";
      },
      values: range2,
      onChange: function onChange(nextRange) {
        setRange2(nextRange);
      }
    }))))
    // </Grommet>
  );
};

export default {
  title: 'Input/RangeSelector/Label'
};