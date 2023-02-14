import React from 'react';
import { Box, Button, CheckBox, FileInput, Form, FormField, RadioButtonGroup, RangeInput, Select, TextArea } from 'grommet';
export var FieldWithComponentProp = function FieldWithComponentProp() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      overflow: "auto",
      align: "center",
      justify: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      flex: false,
      width: "medium"
    }, /*#__PURE__*/React.createElement(Form, {
      onReset: function onReset(event) {
        return console.log(event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value,
          touched = _ref.touched;
        return console.log('Submit', value, touched);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Name",
      htmlFor: "name",
      id: "name",
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
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      htmlFor: "email",
      id: "email",
      name: "email",
      type: "email",
      required: true
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Employee ID",
      htmlFor: "employeeId",
      id: "employeeId",
      name: "employeeId",
      required: true,
      validate: {
        regexp: /^[0-9]{4,6}$/,
        message: '4-6 digits'
      }
    }), /*#__PURE__*/React.createElement(FormField, {
      name: "subscribe",
      component: CheckBox,
      label: "Subscribe?"
    }), /*#__PURE__*/React.createElement(FormField, {
      name: "ampm",
      component: RadioButtonGroup,
      options: ['morning', 'evening']
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Size",
      htmlFor: "size",
      id: "size",
      "aria-label": "size",
      name: "size",
      component: Select,
      onChange: function onChange(event) {
        return console.log(event);
      },
      options: ['small', 'medium', 'large', 'xlarge']
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Comments",
      htmlFor: "comments",
      id: "comments",
      name: "comments",
      component: TextArea
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Age",
      htmlFor: "age",
      id: "age",
      name: "age",
      component: RangeInput,
      pad: true,
      min: 15,
      max: 75
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "File",
      htmlFor: "file",
      id: "file",
      name: "file",
      component: FileInput
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Custom",
      htmlFor: "custom",
      id: "custom",
      name: "custom",
      component: function component(props) {
        return /*#__PURE__*/React.createElement("input", props);
      }
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Cancel"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))))
    // </Grommet>
  );
};

FieldWithComponentProp.storyName = 'Field with component prop';
FieldWithComponentProp.args = {
  full: true
};
export default {
  title: 'Input/Form/Field with component prop'
};