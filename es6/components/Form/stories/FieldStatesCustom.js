import React, { useRef, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Form, FormField, TextInput, Grommet } from 'grommet';
import { deepMerge } from '../../../utils';
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

var CustomFormFieldStates = function CustomFormFieldStates() {
  var inputRef = useRef();
  useEffect(function () {
    inputRef.current.focus();
  }, []);
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Form, null, React.createElement(Box, {
    border: true,
    gap: "medium",
    pad: "large",
    width: "medium"
  }, React.createElement(FormField, {
    htmlFor: "enabled-id",
    name: "enabled",
    label: "Default"
  }, React.createElement(TextInput, {
    id: "enabled-id",
    name: "enabled",
    placeholder: "Enter a username"
  })), React.createElement(FormField, {
    htmlFor: "focus-id",
    name: "focus",
    label: "Focus State"
  }, React.createElement(TextInput, {
    id: "focus-id",
    name: "focus",
    placeholder: "Enter a username",
    ref: inputRef
  })), React.createElement(FormField, {
    htmlFor: "info-id",
    name: "info-demo",
    label: "Info State",
    info: "Unique name. No spaces. May include '-' as a separator."
  }, React.createElement(TextInput, {
    id: "info-id",
    name: "info-demo",
    placeholder: "Enter a username",
    value: "fluffyKi"
  })), React.createElement(FormField, {
    htmlFor: "error-id",
    name: "error-demo",
    label: "Error State",
    error: "It looks like that username is already taken. Bummer."
  }, React.createElement(TextInput, {
    id: "error-id",
    name: "error-demo",
    placeholder: "Enter a username",
    value: "fluffyKitty123"
  })), React.createElement(FormField, {
    htmlFor: "disabled-id",
    name: "disabled",
    label: "Disabled State",
    disabled: true
  }, React.createElement(TextInput, {
    id: "disabled-id",
    name: "disabled",
    placeholder: "Enter a username",
    disabled: true
  }))))));
};

storiesOf('Form', module).add('Field States Custom', function () {
  return React.createElement(CustomFormFieldStates, null);
});