import React, { useState } from 'react';
import { Box, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
export var Fill = function Fill() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, /*#__PURE__*/React.createElement(TextArea, {
    value: value,
    onChange: onChange,
    fill: true
  })));
};
export default {
  title: 'Input/TextArea/Fill'
};