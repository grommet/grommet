import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var SuggestionsTextInput = function SuggestionsTextInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Box, {
    width: "medium"
  }, React.createElement(TextInput, {
    value: value,
    dropProps: {
      height: 'small'
    },
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions
  }))));
};

storiesOf('TextInput', module).add('Suggestions', function () {
  return React.createElement(SuggestionsTextInput, null);
});