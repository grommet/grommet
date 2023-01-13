import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Close } from "grommet-icons/es6/icons/Close";
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Box, Button, Form, FormField, Heading, Layer, Select, TextInput } from 'grommet';
export var FormLayer = function FormLayer() {
  var _React$useState = React.useState(false),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var onOpen = function onOpen() {
    return setOpen(true);
  };
  var onClose = function onClose() {
    return setOpen(undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(Add, null),
      label: "Add",
      onClick: onOpen
    }), open && /*#__PURE__*/React.createElement(Layer, {
      position: "right",
      full: "vertical",
      modal: true,
      onClickOutside: onClose,
      onEsc: onClose
    }, /*#__PURE__*/React.createElement(Box, {
      fill: "vertical",
      overflow: "auto",
      width: "medium",
      pad: "medium"
    }, /*#__PURE__*/React.createElement(Form, {
      validate: "blur",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/React.createElement(Box, {
      flex: false,
      direction: "row",
      justify: "between"
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      margin: "none"
    }, "Add"), /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(Close, null),
      onClick: onClose
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Name",
      "aria-label": "name",
      name: "name",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (name) {
        if (name && name.length === 1) return 'must be >1 character';
        return undefined;
      }, function (name) {
        if (name === 'good') return {
          message: /*#__PURE__*/React.createElement(Box, {
            align: "end"
          }, /*#__PURE__*/React.createElement(StatusGood, null)),
          status: 'info'
        };
        return undefined;
      }]
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      name: "email",
      required: true
    }, /*#__PURE__*/React.createElement(TextInput, {
      name: "email",
      "aria-label": "email",
      type: "email"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Size",
      name: "select-size",
      htmlFor: "select-size__input",
      required: true,
      validate: function validate(val) {
        if (val === 'small') {
          return {
            message: 'Only 10 left in stock!',
            status: 'info'
          };
        }
        return undefined;
      }
    }, /*#__PURE__*/React.createElement(Select, {
      name: "select-size",
      id: "select-size",
      options: ['small', 'medium', 'large']
    })), /*#__PURE__*/React.createElement(Box, {
      flex: false,
      as: "footer",
      align: "start"
    }, /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Submit",
      onClick: onClose,
      primary: true
    }))))))
    // </Grommet>
  );
};

FormLayer.storyName = 'Form';
FormLayer.parameters = {
  chromatic: {
    disable: true
  }
};
FormLayer.args = {
  full: true
};
export default {
  title: 'Layout/Layer/Form'
};