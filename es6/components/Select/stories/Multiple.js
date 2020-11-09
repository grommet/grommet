import React, { useState } from 'react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var options = ['one', 'two'];
export var Multiple = function Multiple() {
  var _useState = useState(['one']),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Select",
    multiple: true,
    closeOnChange: false,
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    }
  })));
};
Multiple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};