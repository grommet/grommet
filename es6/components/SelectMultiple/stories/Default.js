import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';
var defaultOptions = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
export var Default = function Default() {
  var _useState = useState(defaultOptions),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = useState([]),
    valueMultiple = _useState2[0],
    setValueMultiple = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/React.createElement(Text, null, "SelectMultiple Default"), /*#__PURE__*/React.createElement(SelectMultiple, {
      value: valueMultiple,
      placeholder: "Select",
      options: options,
      onSearch: function onSearch(text) {
        // The line below escapes regular expression special characters:
        // [ \ ^ $ . | ? * + ( )
        var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

        // Create the regular expression with modified value which
        // handles escaping special characters. Without escaping special
        // characters, errors will appear in the console
        var exp = new RegExp(escapedText, 'i');
        setOptions(defaultOptions.filter(function (o) {
          return exp.test(o);
        }));
      },
      onClose: function onClose() {
        return setOptions(defaultOptions);
      },
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};

Default.parameters = {
  chromatic: {
    disable: true
  }
};
Default.args = {
  full: true
};
export default {
  title: 'Input/SelectMultiple/Default'
};