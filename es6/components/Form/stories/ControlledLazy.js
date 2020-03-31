import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, Grommet, Form, FormField, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _React$useState = React.useState(undefined),
      value = _React$useState[0],
      setValue = _React$useState[1];

  React.useEffect(function () {
    return setValue({
      name: 'initial',
      email: 'initial@my.com',
      subscribe: true,
      ampm: 'evening',
      size: 'large',
      comments: 'initial',
      age: 60
    });
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
    value: value,
    onChange: function onChange(nextValue) {
      return setValue(nextValue);
    },
    onReset: function onReset() {
      return setValue({});
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name"
  }, React.createElement(TextInput, {
    name: "name"
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
    }]
  })), React.createElement(FormField, {
    name: "subscribe"
  }, React.createElement(CheckBox, {
    name: "subscribe",
    label: "Subscribe?"
  })), React.createElement(FormField, {
    name: "ampm"
  }, React.createElement(RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening']
  })), React.createElement(FormField, {
    label: "Size",
    name: "size"
  }, React.createElement(Select, {
    name: "size",
    options: ['small', 'medium', 'large']
  })), React.createElement(FormField, {
    label: "Comments",
    name: "comments"
  }, React.createElement(TextArea, {
    name: "comments"
  })), React.createElement(FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, React.createElement(RangeInput, {
    name: "age",
    min: 15,
    max: 75
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

storiesOf('Form', module).add('Controlled lazy', function () {
  return React.createElement(Example, null);
});