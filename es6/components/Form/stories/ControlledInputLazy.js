import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, Grommet, Form, FormField, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _React$useState = React.useState(),
      textInputValue = _React$useState[0],
      setTextInputValue = _React$useState[1];

  var _React$useState2 = React.useState(),
      maskedInputValue = _React$useState2[0],
      setMaskedInputValue = _React$useState2[1];

  var _React$useState3 = React.useState(),
      checkBoxValue = _React$useState3[0],
      setCheckBoxValue = _React$useState3[1];

  var _React$useState4 = React.useState(),
      radioButtonGroupValue = _React$useState4[0],
      setRadioButtonValue = _React$useState4[1];

  var _React$useState5 = React.useState(),
      selectValue = _React$useState5[0],
      setSelectValue = _React$useState5[1];

  var _React$useState6 = React.useState(),
      textAreaValue = _React$useState6[0],
      setTextAreaValue = _React$useState6[1];

  var _React$useState7 = React.useState(),
      rangeInputValue = _React$useState7[0],
      setRangeInputValue = _React$useState7[1];

  React.useEffect(function () {
    setTextInputValue('initial');
    setMaskedInputValue('initial@my.com');
    setCheckBoxValue(true);
    setRadioButtonValue('evening');
    setSelectValue('large');
    setTextAreaValue('initial');
    setRangeInputValue(60);
  }, []);
  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Box, {
    width: "medium"
  }, React.createElement(Form, {
    onReset: function onReset() {
      setTextInputValue(undefined);
      setMaskedInputValue(undefined);
      setCheckBoxValue(undefined);
      setRadioButtonValue(undefined);
      setSelectValue(undefined);
      setTextAreaValue(undefined);
      setRangeInputValue(undefined);
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name"
  }, React.createElement(TextInput, {
    name: "name",
    value: textInputValue,
    onChange: function onChange(event) {
      return setTextInputValue(event.target.value);
    }
  })), React.createElement(FormField, {
    label: "Email",
    name: "email",
    required: true
  }, React.createElement(MaskedInput, {
    name: "email",
    mask: [{
      regexp: /^[\w\-_.]+$/,
      placeholder: 'example'
    }, {
      fixed: '@'
    }, {
      regexp: /^[\w]+$/,
      placeholder: 'my'
    }, {
      fixed: '.'
    }, {
      regexp: /^[\w]+$/,
      placeholder: 'com'
    }],
    value: maskedInputValue,
    onChange: function onChange(event) {
      return setMaskedInputValue(event.target.value);
    }
  })), React.createElement(FormField, {
    name: "subscribe"
  }, React.createElement(CheckBox, {
    name: "subscribe",
    label: "Subscribe?",
    checked: checkBoxValue,
    onChange: function onChange(event) {
      return setCheckBoxValue(event.target.checked);
    }
  })), React.createElement(FormField, {
    name: "ampm"
  }, React.createElement(RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening'],
    value: radioButtonGroupValue,
    onChange: function onChange(event) {
      return setRadioButtonValue(event.target.value);
    }
  })), React.createElement(FormField, {
    label: "Size",
    name: "size"
  }, React.createElement(Select, {
    name: "size",
    options: ['small', 'medium', 'large'],
    value: selectValue,
    onChange: function onChange(event) {
      return setSelectValue(event.option);
    }
  })), React.createElement(FormField, {
    label: "Comments",
    name: "comments"
  }, React.createElement(TextArea, {
    name: "comments",
    value: textAreaValue,
    onChange: function onChange(event) {
      return setTextAreaValue(event.target.value);
    }
  })), React.createElement(FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, React.createElement(RangeInput, {
    name: "age",
    min: 15,
    max: 75,
    value: rangeInputValue,
    onChange: function onChange(event) {
      return setRangeInputValue(event.target.value);
    }
  })), React.createElement(Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, React.createElement(Button, {
    label: "Cancel"
  }), React.createElement(Button, {
    type: "reset",
    label: "Reset"
  }), React.createElement(Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

storiesOf('Form', module).add('Controlled Input lazy', function () {
  return React.createElement(Example, null);
});