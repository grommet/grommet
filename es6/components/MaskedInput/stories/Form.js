import React from 'react';
import { Box, Button, Form, FormField, MaskedInput } from 'grommet';
export var MaskedInputForm = function MaskedInputForm() {
  var _React$useState = React.useState({
      value: ''
    }),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(nextValue) {
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Form, {
      value: value,
      onChange: onChange,
      onSubmit: function onSubmit(_ref) {
        var nextValue = _ref.value;
        console.log(nextValue);
        setValue({
          value: ''
        });
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      name: "value",
      label: "url",
      required: true
    }, /*#__PURE__*/React.createElement(MaskedInput, {
      name: "value",
      mask: [{
        fixed: 'https://'
      }, {
        regexp: /^.*$/
      }]
    })), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "submit"
    })))
    // </Grommet>
  );
};

MaskedInputForm.storyName = 'Form';
export default {
  title: 'Input/MaskedInput/Form'
};