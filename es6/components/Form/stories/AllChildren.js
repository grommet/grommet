import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, Grommet, Form, FormField, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
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
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name",
    required: true
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

storiesOf('Form', module).add('All children', function () {
  return React.createElement(Example, null);
});