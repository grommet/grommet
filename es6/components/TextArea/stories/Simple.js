function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState } from 'react';
import { Box, TextArea } from 'grommet';
var Resize = function Resize(props) {
  var _useState = useState(''),
    value = _useState[0],
    setValue = _useState[1];
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(TextArea, _extends({
      "aria-label": "text area",
      value: value,
      onChange: onChange
    }, props)))
    // </Grommet>
  );
};

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Resize, {
    resize: true
  });
};
export default {
  title: 'Input/TextArea/Simple'
};