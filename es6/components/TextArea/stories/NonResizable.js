function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Box, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

var Resize = function Resize(props) {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

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

export var NonResizable = function NonResizable() {
  return /*#__PURE__*/React.createElement(Resize, {
    resize: false
  });
};
NonResizable.storyName = 'Non resizable';
export default {
  title: 'Input/TextArea/Non resizable'
};