function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
var allSuggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var FormFieldTextInput = function FormFieldTextInput(props) {
  var _useState = useState({
    value: '',
    suggestions: allSuggestions
  }),
      state = _useState[0],
      setState = _useState[1];

  var onChange = function onChange(event) {
    var value = event.target.value; // The line below escapes regular expression special characters:
    // [ \ ^ $ . | ? * + ( )

    var escapedText = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
    // handles escaping special characters. Without escaping special
    // characters, errors will appear in the console

    var exp = new RegExp(escapedText, 'i');
    var suggestions = allSuggestions.filter(function (s) {
      return exp.test(s);
    });
    setState({
      value: value,
      suggestions: suggestions
    });
  };

  var onSelect = function onSelect(event) {
    return setState(_extends({}, state, {
      value: event.suggestion
    }));
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "text-input"
  }, props), /*#__PURE__*/React.createElement(TextInput, {
    id: "text-input",
    placeholder: "placeholder",
    value: state.value,
    onChange: onChange,
    onSelect: onSelect,
    suggestions: state.suggestions
  })))));
};

storiesOf('Form', module).add('TextInput', function () {
  return /*#__PURE__*/React.createElement(FormFieldTextInput, null);
});