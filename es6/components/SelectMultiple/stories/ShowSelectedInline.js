import React, { useState } from 'react';
import { Box, SelectMultiple, Text } from 'grommet';
var defaultOptions = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
export var ShowSelectedInline = function ShowSelectedInline() {
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
    }, /*#__PURE__*/React.createElement(Text, null, "SelectMultiple showSelectedInline"), /*#__PURE__*/React.createElement(SelectMultiple, {
      showSelectedInline: true,
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
      value: valueMultiple,
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};

ShowSelectedInline.storyName = 'showSelectedInline';
ShowSelectedInline.parameters = {
  chromatic: {
    disable: true
  }
};
ShowSelectedInline.args = {
  full: true
};
export default {
  title: 'Input/SelectMultiple/showSelectedInline'
};