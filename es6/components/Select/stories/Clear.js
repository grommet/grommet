import React, { useState } from 'react';
import { Box, Grommet, Select, grommet } from 'grommet';
var options = ['one', 'two', 'three'];

var ClearTop = function ClearTop() {
  var _useState = useState(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Clear Options",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    clear: true
  }));
};

export var Clear = function Clear() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(ClearTop, null));
};
Clear.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/Select/Clear'
};