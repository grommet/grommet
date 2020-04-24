import React, { useRef, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Form, FormField, TextInput, Grommet } from 'grommet';

var FormFieldStates = function FormFieldStates() {
  var inputRef = useRef();
  useEffect(function () {
    inputRef.current.focus();
  }, []);
  return React.createElement(Grommet, {
    theme: grommet
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

storiesOf('Form', module).add('Field States', function () {
  return React.createElement(FormFieldStates, null);
});