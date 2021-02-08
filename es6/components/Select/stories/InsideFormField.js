import React, { useCallback, useState } from 'react';
import { Box, Button, Form, FormField, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var options = [{
  label: 'option 1',
  value: 1
}, {
  label: 'option 2',
  value: 2
}, {
  label: 'option 3',
  value: 3
}];
export var InsideFormField = function InsideFormField() {
  var _useState = useState({}),
      value = _useState[0],
      setValue = _useState[1];

  var onChange = useCallback(function (nextValue) {
    return setValue(nextValue);
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, {
    value: value,
    onChange: onChange,
    onSubmit: function onSubmit() {
      return console.log('Submit', value);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Label",
    name: "select"
  }, /*#__PURE__*/React.createElement(Select, {
    name: "select",
    placeholder: "placeholder",
    options: options,
    labelKey: "label",
    valueKey: "value"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))));
};
InsideFormField.storyName = 'Inside a FormField';
export default {
  title: 'Input/Select/Inside a FormField'
};