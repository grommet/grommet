import React, { useState } from 'react';
import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple(_ref) {
  var _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction;

  var _useState = useState([12, 16]),
      range = _useState[0],
      setRange = _useState[1];

  var onChange = function onChange(values) {
    setRange(values);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, {
    direction: direction === 'vertical' ? 'column' : 'row',
    justify: "between"
  }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
    return /*#__PURE__*/React.createElement(Box, {
      key: value,
      width: "xxsmall",
      height: "xxsmall",
      align: "center",
      pad: "small",
      border: false
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), /*#__PURE__*/React.createElement(RangeSelector, {
    direction: direction,
    min: 10,
    max: 20,
    size: "full",
    values: range,
    onChange: onChange
  }))));
};
export default {
  title: 'Input/RangeSelector/Simple'
};