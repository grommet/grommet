import React, { useState } from 'react';
import { Box, Select } from 'grommet';
var options = [];
for (var i = 0; i < 500; i += 1) {
  options.push("Number " + i);
}
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
    value: value,
    multiple: true,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    dropHeight: "large",
    clear: true
  }));
};
var ClearBottom = function ClearBottom() {
  var _useState2 = useState(),
    value = _useState2[0],
    setValue = _useState2[1];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Clear Options",
    value: value,
    multiple: true,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    dropHeight: "large",
    clear: {
      position: 'bottom'
    }
  }));
};
export var Clear = function Clear() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ClearTop, null), /*#__PURE__*/React.createElement(ClearBottom, null))
    // </Grommet>
  );
};

Clear.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/Select/Clear'
};