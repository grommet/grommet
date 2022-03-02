import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Close } from "grommet-icons/es6/icons/Close";
import { Box, Button, FormField, Heading, Layer, Select, TextArea, TextInput } from 'grommet';
var suggestions = ['alpha', 'beta'];
export var FormLayer = function FormLayer() {
  var _React$useState = React.useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(''),
      select = _React$useState2[0],
      setSelect = _React$useState2[1];

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
      as: "form",
      fill: "vertical",
      overflow: "auto",
      width: "medium",
      pad: "medium",
      onSubmit: onClose
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
    })), /*#__PURE__*/React.createElement(Box, {
      flex: "grow",
      overflow: "auto",
      pad: {
        vertical: 'medium'
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "First"
    }, /*#__PURE__*/React.createElement(TextInput, {
      suggestions: suggestions
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Second"
    }, /*#__PURE__*/React.createElement(Select, {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
      value: select,
      onSearch: function onSearch() {},
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setSelect(option);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Third"
    }, /*#__PURE__*/React.createElement(TextArea, null))), /*#__PURE__*/React.createElement(Box, {
      flex: false,
      as: "footer",
      align: "start"
    }, /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Submit",
      onClick: onClose,
      primary: true
    }))))) // </Grommet>

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