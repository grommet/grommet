import React, { useState } from 'react';
import { Box, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  textArea: {
    extend: function extend() {
      return "\n      font-size: 40px;\n      color: red;\n    ";
    }
  }
});
export var Themed = function Themed() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
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