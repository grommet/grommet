import React, { useState } from 'react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var objectOptions = [{
  label: 'Male',
  value: 1
}, {
  label: 'Female',
  value: 2
}, {
  label: 'Non Binary',
  value: 3
}, {
  label: 'Other',
  value: 4
}];
export var ObjectOptions = function ObjectOptions() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "select",
    name: "select",
    placeholder: "Select",
    labelKey: "label",
    valueKey: {
      key: 'value',
      reduce: true
    },
    value: value,
    options: objectOptions,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    }
  })));
};
ObjectOptions.storyName = 'Object options';
ObjectOptions.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/Select/Object options'
};