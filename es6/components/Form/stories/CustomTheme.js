import React from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';
import { grommet, Box, Button, CheckBox, Form, FormField, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput, Grommet } from 'grommet';
var customFormFieldTheme = {
  global: {
    font: {
      size: '16px'
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'small',
      margin: 'xsmall',
      weight: 600
    },
    border: {
      position: 'outer',
      side: 'all'
    },
    disabled: {
      background: {
        color: 'status-disabled',
        opacity: true
      }
    },
    content: {
      pad: 'small'
    },
    error: {
      background: {
        color: 'status-critical',
        opacity: 'weak'
      }
    },
    margin: 'none'
  }
};

var CustomFormField = function CustomFormField() {
  return React.createElement(Grommet, {
    full: true,
    theme: deepMerge(grommet, customFormFieldTheme)
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
    name: "comments",
    disabled: true
  }, React.createElement(TextArea, {
    name: "comments",
    disabled: true
  })), React.createElement(FormField, {
    label: "Age",
    name: "age"
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

storiesOf('Form', module).add('Custom Theme', function () {
  return React.createElement(CustomFormField, null);
});