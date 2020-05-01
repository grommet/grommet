function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, FormField, Form, Text, Button, Grommet } from 'grommet';

var FormFieldLabel = function FormFieldLabel(props) {
  var required = props.required,
      label = props.label,
      rest = _objectWithoutPropertiesLoose(props, ["required", "label"]);

  return /*#__PURE__*/React.createElement(FormField, _extends({
    label: required ? /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(Text, null, label), /*#__PURE__*/React.createElement(Text, {
      color: "status-critical"
    }, "*")) : label,
    required: required
  }, rest));
};

var LabelFormField = function LabelFormField() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormFieldLabel, {
    name: "firstName",
    label: "FirstName",
    required: true
  }), /*#__PURE__*/React.createElement(FormFieldLabel, {
    name: "LastName",
    label: "LastName",
    required: true
  }), /*#__PURE__*/React.createElement(FormFieldLabel, {
    name: "email",
    label: "Email"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Submit",
    primary: true
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      left: 'small'
    },
    size: "small",
    color: "status-critical"
  }, "* Required Field"))));
};

storiesOf('Form', module).add('Required Label', function () {
  return /*#__PURE__*/React.createElement(LabelFormField, null);
});