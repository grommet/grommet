import React, { useState } from 'react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0
  });
}

export var ObjectMultiple = function ObjectMultiple() {
  var _useState = useState(objectOptions),
      options = _useState[0],
      setOptions = _useState[1];

  var _useState2 = useState([1, 2]),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    size: "medium",
    placeholder: "Select",
    multiple: true,
    closeOnChange: false,
    disabledKey: "dis",
    labelKey: "lab",
    valueKey: {
      key: 'val',
      reduce: true
    },
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    onClose: function onClose() {
      return setOptions(objectOptions);
    },
    onSearch: function onSearch(text) {
      // The line below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
      // handles escaping special characters. Without escaping special
      // characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
      setOptions(objectOptions.filter(function (o) {
        return exp.test(o.lab);
      }));
    }
  })));
};
ObjectMultiple.story = {
  name: 'Object multiple'
};