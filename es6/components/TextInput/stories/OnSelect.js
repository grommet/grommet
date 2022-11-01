import React from 'react';
import { Box, TextInput } from 'grommet';
var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});
export var OnSelect = function OnSelect() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };
  var onHighlight = function onHighlight(event) {
    if (event.target.selectionStart !== event.target.selectionEnd) {
      console.log(event.target.value.substring(event.target.selectionStart, event.target.selectionEnd));
    }
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
      value: value,
      onChange: onChange,
      onSelect: onHighlight,
      onSuggestionSelect: onSelect,
      suggestions: suggestions,
      "aria-label": "Input text"
    })))
    // </Grommet>
  );
};

OnSelect.storyName = 'onSelect and onSuggestionSelect';
OnSelect.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/TextInput/onSelect and onSuggestionSelect'
};