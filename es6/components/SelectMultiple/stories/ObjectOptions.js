import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';
var objectOptions = [{
  label: 'Red',
  value: 1
}, {
  label: 'Blue',
  value: 2
}, {
  label: 'Green',
  value: 3
}, {
  label: 'Purple',
  value: 4
}];
export var ObjectOptions = function ObjectOptions() {
  var _useState = useState(objectOptions),
      options = _useState[0],
      setOptions = _useState[1];

  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      gap: "large",
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Text, null, "SelectMultiple with Object Options"), /*#__PURE__*/React.createElement(SelectMultiple, {
      onSearch: function onSearch(text) {
        var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
        // handles escaping special characters. Without escaping special
        // characters, errors will appear in the console

        var exp = new RegExp(escapedText, 'i');
        setOptions(objectOptions.filter(function (o) {
          return exp.test(o.label);
        }));
      },
      showSelectedInline: true,
      id: "select",
      name: "select",
      placeholder: "Select",
      labelKey: "label",
      valueKey: {
        key: 'value'
      },
      options: options
    })) // </Grommet>

  );
};
ObjectOptions.storyName = 'Object options';
ObjectOptions.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/SelectMultiple/Object options'
};