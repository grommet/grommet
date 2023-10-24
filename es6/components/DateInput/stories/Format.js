import React from 'react';
import { Box, DateInput } from 'grommet';
export var Format = function Format() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setValue(nextValue);
  };
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium",
    margin: {
      vertical: 'small'
    }
  }, /*#__PURE__*/React.createElement(DateInput, {
    format: "m/d/yy",
    value: value,
    onChange: onChange
  })), /*#__PURE__*/React.createElement(Box, {
    width: "medium",
    margin: {
      vertical: 'small'
    }
  }, /*#__PURE__*/React.createElement(DateInput, {
    format: "m/d/yy",
    value: value,
    reverse: true,
    onChange: onChange
  })));
};
export default {
  title: 'Input/DateInput/Format'
};