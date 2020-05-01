function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleTextArea = function SimpleTextArea(props) {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(TextArea, _extends({
    value: value,
    onChange: onChange
  }, props))));
};

storiesOf('TextArea', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(SimpleTextArea, {
    resize: true
  });
}).add('Non resizable', function () {
  return /*#__PURE__*/React.createElement(SimpleTextArea, {
    resize: false
  });
});