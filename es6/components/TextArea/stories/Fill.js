import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

var FillTextArea = function FillTextArea() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, /*#__PURE__*/React.createElement(TextArea, {
    value: value,
    onChange: onChange,
    fill: true
  })));
};

storiesOf('TextArea', module).add('Fill', function () {
  return /*#__PURE__*/React.createElement(FillTextArea, null);
});