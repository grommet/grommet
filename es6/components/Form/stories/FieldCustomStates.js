import React, { useRef, useEffect } from 'react';
import { grommet, Box, Form, FormField, TextInput, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  formField: {
    border: {
      error: {
        color: 'border'
      },
      color: 'border',
      side: 'all'
    },
    disabled: {
      background: {
        color: undefined
      },
      border: {
        color: 'status-disabled'
      },
      label: {
        color: 'status-disabled'
      }
    },
    error: {
      background: {
        color: {
          light: '#FF404033',
          dark: '#FF40404D'
        }
      },
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none'
      }
    },
    help: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
        bottom: 'xsmall'
      }
    },
    info: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none'
      }
    },
    label: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        horizontal: 'none'
      }
    },
    round: '4px'
  }
});
export var FieldCustomStates = function FieldCustomStates() {
  var inputRef = useRef();
  useEffect(function () {
    inputRef.current.focus();
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Box, {
    border: true,
    gap: "medium",
    pad: "large",
    width: "medium"
  }, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "enabled-id",
    name: "enabled",
    label: "Default"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "enabled-id",
    name: "enabled",
    placeholder: "Enter a username"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "focus-id",
    name: "focus",
    label: "Focus State"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "focus-id",
    name: "focus",
    placeholder: "Enter a username",
    ref: inputRef
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "info-id",
    name: "info-demo",
    label: "Info State",
    info: "Unique name. No spaces. May include '-' as a separator."
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "info-id",
    name: "info-demo",
    placeholder: "Enter a username",
    value: "fluffyKi"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "error-id",
    name: "error-demo",
    label: "Error State",
    error: "It looks like that username is already taken. Bummer."
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "error-id",
    name: "error-demo",
    placeholder: "Enter a username",
    value: "fluffyKitty123"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "disabled-id",
    name: "disabled",
    label: "Disabled State",
    disabled: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "disabled-id",
    name: "disabled",
    placeholder: "Enter a username",
    disabled: true
  }))))));
};
FieldCustomStates.storyName = 'Field custom states';
export default {
  title: 'Input/Form/Field custom states'
};