import React from 'react';
import { Box, FileInput, Form, FormField, Grommet, Heading } from 'grommet';
var messageBundle = {
  'form.required': '必填项目',
  'fileInput.browse': '浏览'
};
var customMessages = {
  messages: {
    form: {
      required: 'necesario'
    },
    fileInput: {
      browse: 'navegar'
    }
  }
};
export var Messages = function Messages() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    messages: customMessages
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Custom messages"), /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, {
    validate: "blur"
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "name",
    label: "Name",
    required: true
  }), /*#__PURE__*/React.createElement(FileInput, null)))), /*#__PURE__*/React.createElement(Grommet, {
    messages: {
      format: function format(options) {
        return messageBundle[options.id];
      }
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Message function"), /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, {
    validate: "blur"
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "name",
    label: "Name",
    required: true
  }), /*#__PURE__*/React.createElement(FileInput, null)))));
};
export default {
  title: 'Utilities/Grommet/Messages'
};