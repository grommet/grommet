import React, { useState } from 'react';
import { Box, FormField, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var allOptions = Array(100).fill().map(function (_, i) {
  return "option " + (i + 1);
});
export var Simple = function Simple() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Label",
    htmlFor: "select"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "select",
    placeholder: "placeholder",
    options: allOptions,
    value: value,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    }
  }))));
};