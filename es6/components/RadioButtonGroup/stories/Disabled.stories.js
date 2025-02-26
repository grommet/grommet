var _excluded = ["value"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import { Box, RadioButtonGroup } from 'grommet';
export var Disabled = function Disabled(_ref) {
  var initialValue = _ref.value,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState(initialValue),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, _extends({
    name: "radio",
    options: [{
      label: 'Choice 1',
      value: 'c1'
    }, {
      label: 'Choice 2',
      value: 'c2'
    }, {
      label: 'Choice 3',
      value: 'c3'
    }],
    disabled: true,
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, props)));
};
export default {
  title: 'Input/RadioButtonGroup/Disabled'
};