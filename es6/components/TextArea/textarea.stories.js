function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

var SimpleTextArea = function SimpleTextArea(props) {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(TextArea, _extends({
    value: value,
    onChange: onChange
  }, props))));
};

var customTheme = deepMerge(grommet, {
  textArea: {
    extend: function extend() {
      return "\n      font-size: 40px;\n      color: red;\n    ";
    }
  }
});

var ThemedTextArea = function ThemedTextArea() {
  var _React$useState2 = React.useState(''),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, React.createElement(TextArea, {
    value: value,
    onChange: onChange,
    fill: true
  })));
};

var FillTextArea = function FillTextArea() {
  var _React$useState3 = React.useState(''),
      value = _React$useState3[0],
      setValue = _React$useState3[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, React.createElement(TextArea, {
    value: value,
    onChange: onChange,
    fill: true
  })));
};

storiesOf('TextArea', module).add('Simple', function () {
  return React.createElement(SimpleTextArea, {
    resize: true
  });
}).add('Fill', function () {
  return React.createElement(FillTextArea, null);
}).add('Themed', function () {
  return React.createElement(ThemedTextArea, null);
}).add('Non resizable', function () {
  return React.createElement(SimpleTextArea, {
    resize: false
  });
});