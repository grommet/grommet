import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, Grommet, Form, FormField, RadioButtonGroup, RangeInput, Select, TextArea } from 'grommet';
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
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (name) {
      if (name && name.length === 1) return 'must be >1 character';
      return undefined;
    }, function (name) {
      if (name && name.length <= 2) return {
        message: "that's short",
        status: 'info'
      };
      return undefined;
    }]
  }), React.createElement(FormField, {
    label: "Email",
    name: "email",
    type: "email",
    required: true
  }), React.createElement(FormField, {
    label: "Employee ID",
    name: "employeeId",
    required: true,
    validate: {
      regexp: /^[0-9]{4,6}$/,
      message: '4-6 digits'
    }
  }), React.createElement(FormField, {
    name: "subscribe",
    component: CheckBox,
    label: "Subscribe?"
  }), React.createElement(FormField, {
    name: "ampm",
    component: RadioButtonGroup,
    options: ['morning', 'evening']
  }), React.createElement(FormField, {
    label: "Size",
    name: "size",
    component: Select,
    onChange: function onChange(event) {
      return console.log(event);
    },
    options: ['small', 'medium', 'large', 'xlarge']
  }), React.createElement(FormField, {
    label: "Comments",
    name: "comments",
    component: TextArea
  }), React.createElement(FormField, {
    label: "Age",
    name: "age",
    component: RangeInput,
    pad: true,
    min: 15,
    max: 75
  }), React.createElement(FormField, {
    label: "Custom",
    name: "custom",
    component: function component(props) {
      return React.createElement("input", props);
    }
  }), React.createElement(Box, {
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

storiesOf('Form', module).add('All', function () {
  return React.createElement(Example, null);
});