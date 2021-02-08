import React, { useEffect, useRef } from 'react';
import { Box, Form, FormField, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var FieldStates = function FieldStates() {
  var inputRef = useRef();
  useEffect(function () {
    inputRef.current.focus();
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
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
FieldStates.storyName = 'Field states';
export default {
  title: 'Input/Form/Field states'
};