function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, FormField, Select, Grommet } from 'grommet';
var allOptions = Array(100).fill().map(function (_, i) {
  return "option " + (i + 1);
});

var FormFieldSelect = function FormFieldSelect(props) {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "select"
  }, props), /*#__PURE__*/React.createElement(Select, {
    id: "select",
    placeholder: "placeholder",
    options: allOptions,
    value: value,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    }
  }))));
};

storiesOf('FormField', module).add('Select', function () {
  return /*#__PURE__*/React.createElement(FormFieldSelect, null);
});