function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
export var NonResizable = function NonResizable() {
  return /*#__PURE__*/React.createElement(Resize, {
    resize: false
  });
};
NonResizable.storyName = 'Non resizable';
export default {
  title: 'Input/TextArea/Non resizable'
};