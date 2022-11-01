import React from 'react';
import { Box, DateInput, Text } from 'grommet';
export var Simple = function Simple() {
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
    direction: "row",
    align: "center",
    justify: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  }, value && new Date(value).toLocaleDateString()), /*#__PURE__*/React.createElement(DateInput, {
    value: value,
    onChange: onChange
  }));
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/DateInput/Simple'
};