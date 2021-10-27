import React from 'react';
import { Box, Button, DateInput } from 'grommet';
export var FormatInline = function FormatInline() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(DateInput, {
    format: "mm/dd/yyyy",
    inline: true,
    value: value,
    onChange: onChange
  }), /*#__PURE__*/React.createElement(Button, {
    label: "today",
    onClick: function onClick() {
      return setValue(new Date().toISOString());
    }
  }));
};
FormatInline.storyName = 'Format inline';
export default {
  title: 'Input/DateInput/Format inline'
};