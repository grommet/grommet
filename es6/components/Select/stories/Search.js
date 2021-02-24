import React, { useState } from 'react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var defaultOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
}

export var Search = function Search() {
  var _useState = useState(defaultOptions),
      options = _useState[0],
      setOptions = _useState[1];

  var _useState2 = useState(''),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState([]),
      valueMultiple = _useState3[0],
      setValueMultiple = _useState3[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "medium",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Select, {
    size: "medium",
    placeholder: "Select single option",
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    },
    onClose: function onClose() {
      return setOptions(defaultOptions);
    },
    onSearch: function onSearch(text) {
      // The line below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
      // handles escaping special characters. Without escaping special
      // characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
      setOptions(defaultOptions.filter(function (o) {
        return exp.test(o);
      }));
    }
  }), /*#__PURE__*/React.createElement(Select, {
    multiple: true,
    size: "medium",
    placeholder: "Select multiple options",
    value: valueMultiple,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValueMultiple(nextValue);
    },
    closeOnChange: false,
    onClose: function onClose() {
      return setOptions(defaultOptions);
    },
    onSearch: function onSearch(text) {
      // The line below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
      // handles escaping special characters. Without escaping special
      // characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
      setOptions(defaultOptions.filter(function (o) {
        return exp.test(o);
      }));
    }
  })));
};
Search.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/Select/Search'
};