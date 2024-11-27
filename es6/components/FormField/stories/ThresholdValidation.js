import React from 'react';
import { Box, Form, FormField, TextInput } from 'grommet';
export var ThresholdValidation = function ThresholdValidation() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Form, {
      validate: "change"
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Label",
      validate: {
        max: 10,
        threshold: 0.25
      },
      name: "issue-description",
      htmlFor: "issue-description"
    }, /*#__PURE__*/React.createElement(TextInput
    // eslint-disable-next-line max-len
    , {
      "aria-label": "text input with limit of 10 characters and threshold of 0.25",
      id: "issue-description",
      name: "issue-description",
      placeholder: "placeholder"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Label with default threshold",
      validate: {
        max: 10
      },
      name: "issue-description-with-default-threshold",
      htmlFor: "issue-description-with-default-threshold"
    }, /*#__PURE__*/React.createElement(TextInput, {
      "aria-label": "text input with limit of 10 characters",
      id: "issue-description-with-default-threshold",
      name: "issue-description-with-default-threshold",
      placeholder: "placeholder"
    }))))
  );
};
ThresholdValidation.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/FormField/ThresholdValidation'
};