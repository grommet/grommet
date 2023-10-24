import React from 'react';
import { Box, TextInput } from 'grommet';
var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});
export var DefaultSuggestion = function DefaultSuggestion() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "grommet-text-combobox-default-suggestion",
      value: value,
      onChange: onChange,
      onSelect: onSelect,
      suggestions: suggestions,
      defaultSuggestion: 1,
      "aria-label": "Input Text"
    })))
    // </Grommet>
  );
};

DefaultSuggestion.storyName = 'Default suggestion';
DefaultSuggestion.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/TextInput/Default suggestion'
};