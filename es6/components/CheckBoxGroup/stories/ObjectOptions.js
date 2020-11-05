import React, { useState } from 'react';
import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
var objectOptions = [];

for (var i = 1; i <= 5; i += 1) {
  objectOptions.push({
    lab: "option " + i,
    val: i
  });
}

export var ObjectOptions = function ObjectOptions() {
  var _useState = useState([]),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState([]),
      value2 = _useState2[0],
      setValue2 = _useState2[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    labelKey: "lab",
    valueKey: "val",
    value: value,
    onChange: function onChange(event) {
      setValue(event.value);
      console.log('Group1: ', event.value);
    },
    options: objectOptions
  }), /*#__PURE__*/React.createElement(CheckBoxGroup, {
    gap: "xsmall",
    labelKey: "label",
    valueKey: "key",
    value: value2,
    onChange: function onChange(event) {
      setValue2(event.value);
      console.log('Group2: ', event.value);
    },
    options: [{
      label: 'Maui',
      key: 'M'
    }, {
      label: 'Jerusalem',
      key: 'J'
    }, {
      label: 'Wuhan',
      key: 'W'
    }]
  })));
};
ObjectOptions.story = {
  name: 'Object options'
};