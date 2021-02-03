import React from 'react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
var allSuggestions = Array(100).fill().map(function (_, i) {
  return i + 1 + " suggestion";
});
export var Suggestions = function Suggestions() {
  var _React$useState = React.useState(allSuggestions),
      suggestions = _React$useState[0],
      setSuggestions = _React$useState[1];

  var _React$useState2 = React.useState(''),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var onChange = function onChange(event) {
    var nextValue = event.target.value;
    setValue(nextValue);
    if (!nextValue) setSuggestions(allSuggestions);else {
      var regexp = new RegExp("^" + nextValue);
      setSuggestions(allSuggestions.filter(function (s) {
        return regexp.test(s);
      }));
    }
  };

  var onSuggestionSelect = function onSuggestionSelect(event) {
    setValue(event.suggestion);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: value,
    onChange: onChange,
    onSuggestionSelect: onSuggestionSelect,
    suggestions: suggestions
  }))));
};
Suggestions.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};