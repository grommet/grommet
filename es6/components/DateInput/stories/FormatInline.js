import React from 'react';
import { Grommet, Box, DateInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var FormatInline = function FormatInline() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DateInput, {
    format: "mm/dd/yyyy",
    inline: true,
    value: value,
    onChange: onChange
  })));
};
FormatInline.storyName = 'Format inline';
export default {
  title: 'Input/DateInput/Format inline'
};