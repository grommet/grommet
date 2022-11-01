import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';
var defaultOptions = ['French Vanilla Cake with Buttercream', 'Sweet Grilled Peaches', 'Chocolate Chip Cookies', 'Pineapple Upside-Down Cake', 'Peanut Butter Chocolate Fondue', 'Strawberry Shortcake', 'Peach Cobbler', 'German Chocolate Cake', 'Carrot Cake with Cream Cheese Frosting', 'Cinnamon Coffee Cake'];
export var Disabled = function Disabled() {
  var _useState = useState(defaultOptions),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = useState(['Chocolate Chip Cookies', 'Strawberry Shortcake']),
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
    }, /*#__PURE__*/React.createElement(Text, null, "SelectMultiple Disabled"), /*#__PURE__*/React.createElement(SelectMultiple, {
      width: "medium",
      showSelectedInline: true,
      dropProps: {
        width: 'medium'
      }
      // icon={<CaretDown />}
      // icon={false}
      ,
      disabled: ['Chocolate Chip Cookies', 'Pineapple Upside-Down Cake'],
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

Disabled.parameters = {
  chromatic: {
    disable: true
  }
};
Disabled.args = {
  full: true
};
export default {
  title: 'Input/SelectMultiple/Disabled'
};