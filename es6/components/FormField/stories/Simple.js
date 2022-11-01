import React, { useState } from 'react';
import { Box, FormField, Select } from 'grommet';
var allOptions = Array(100).fill().map(function (_, i) {
  return "option " + (i + 1);
});
export var Simple = function Simple() {
  var _useState = useState(''),
    value = _useState[0],
    setValue = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
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
    })))
    // </Grommet>
  );
};

export default {
  title: 'Input/FormField/Simple'
};