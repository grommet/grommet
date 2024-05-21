import React from 'react';
import { Box, TextInput, Form, FormField } from 'grommet';
export var Simple = function Simple() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: value,
      onChange: onChange,
      "aria-label": "Input Text"
    })), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, {
      label: "label"
      // contentProps={{
      //   border: false,
      // }}
    }, /*#__PURE__*/React.createElement(TextInput, null))))
    // </Grommet>
  );
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/TextInput/Simple'
};