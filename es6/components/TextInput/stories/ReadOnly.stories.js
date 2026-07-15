import React from 'react';
import { Box, TextInput, Form, FormField } from 'grommet';
export var ReadOnly = function ReadOnly() {
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
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, null, /*#__PURE__*/React.createElement(TextInput, {
      readOnlyCopy: true,
      value: "Read only with copy button",
      "aria-label": "read only"
    })), /*#__PURE__*/React.createElement(FormField, null, /*#__PURE__*/React.createElement(TextInput, {
      readOnly: true,
      value: "Read only",
      "aria-label": "read only"
    }))), /*#__PURE__*/React.createElement(TextInput, {
      readOnlyCopy: true,
      value: "Read only with copy button",
      "aria-label": "read only"
    }), /*#__PURE__*/React.createElement(TextInput, {
      readOnly: true,
      value: "Read only",
      "aria-label": "read only"
    })))
    // </Grommet>
  );
};
export default {
  title: 'Input/TextInput/ReadOnly'
};