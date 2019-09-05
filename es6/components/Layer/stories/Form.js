import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Close } from "grommet-icons/es6/icons/Close";
import { Box, Button, FormField, Grommet, Heading, Layer, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var FormLayer = function FormLayer() {
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

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: onOpen
  }), open && React.createElement(Layer, {
    position: "right",
    full: "vertical",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, React.createElement(Box, {
    as: "form",
    fill: "vertical",
    overflow: "auto",
    width: "medium",
    pad: "medium",
    onSubmit: onClose
  }, React.createElement(Box, {
    flex: false,
    direction: "row",
    justify: "between"
  }, React.createElement(Heading, {
    level: 2,
    margin: "none"
  }, "Add"), React.createElement(Button, {
    icon: React.createElement(Close, null),
    onClick: onClose
  })), React.createElement(Box, {
    flex: "grow",
    overflow: "auto",
    pad: {
      vertical: 'medium'
    }
  }, React.createElement(FormField, {
    label: "First"
  }, React.createElement(TextInput, null)), React.createElement(FormField, {
    label: "Second"
  }, React.createElement(Select, {
    options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    value: select,
    onSearch: function onSearch() {},
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setSelect(option);
    }
  })), React.createElement(FormField, {
    label: "Third"
  }, React.createElement(TextArea, null))), React.createElement(Box, {
    flex: false,
    as: "footer",
    align: "start"
  }, React.createElement(Button, {
    type: "submit",
    label: "Submit",
    onClick: onClose,
    primary: true
  }))))));
};

storiesOf('Layer', module).add('Form', function () {
  return React.createElement(FormLayer, null);
});