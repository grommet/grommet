import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes'; // the prefix name of the Create option entry

var prefix = 'Create';
var defaultOptions = [];

for (var i = 1; i <= 5; i += 1) {
  defaultOptions.push("option " + i);
}

var updateCreateOption = function updateCreateOption(text) {
  var len = defaultOptions.length;

  if (defaultOptions[len - 1].includes(prefix)) {
    // remove Create option before adding an updated one
    defaultOptions.pop();
  }

  defaultOptions.push(prefix + " '" + text + "'");
}; // improving Search support of special characters


var getRegExp = function getRegExp(text) {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console

  return new RegExp(escapedText, 'i');
};

var CreateOption = function CreateOption() {
  var _useState = useState(defaultOptions),
      options = _useState[0],
      setOptions = _useState[1];

  var _useState2 = useState(''),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(''),
      searchValue = _useState3[0],
      setSearchValue = _useState3[1];

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
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;

      if (option.includes(prefix)) {
        defaultOptions.pop(); // remove Create option

        defaultOptions.push(searchValue);
        setValue(searchValue);
      } else {
        setValue(option);
      }
    },
    onClose: function onClose() {
      return setOptions(defaultOptions);
    },
    onSearch: function onSearch(text) {
      updateCreateOption(text);
      var exp = getRegExp(text);
      setOptions(defaultOptions.filter(function (o) {
        return exp.test(o);
      }));
      setSearchValue(text);
    }
  })));
};

storiesOf('Select', module).add('Create Option', function () {
  return /*#__PURE__*/React.createElement(CreateOption, null);
});