import React from 'react';
import { Box, Button, Grommet, FileInput, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';
export var MaxSize = function MaxSize() {
  var maxSize = 5000000;
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, {
    validate: "submit"
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "File Input With Max Size",
    name: "fileInput",
    htmlFor: "fileInput",
    required: true
  }, /*#__PURE__*/React.createElement(FileInput, {
    name: "fileInput",
    id: "fileInput",
    multiple: true,
    maxSize: maxSize
  })), /*#__PURE__*/React.createElement(Button, {
    label: "Submit",
    primary: true,
    type: "submit"
  })))));
};
export default {
  title: 'Input/FileInput/Max Size'
};