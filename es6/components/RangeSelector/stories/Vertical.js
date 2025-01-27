var _excluded = ["direction"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import { Box, RangeSelector, Stack, Text } from 'grommet';
var SimpleRangeSelector = function SimpleRangeSelector(_ref) {
  var _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState([12, 16]),
    range = _useState[0],
    setRange = _useState[1];
  var onChange = function onChange(values) {
    setRange(values);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, {
      direction: direction === 'vertical' ? 'column' : 'row',
      justify: "between"
    }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
      return /*#__PURE__*/React.createElement(Box, {
        key: value,
        width: "xxsmall",
        height: "xxsmall",
        align: "center",
        pad: "small",
        border: false
      }, /*#__PURE__*/React.createElement(Text, {
        style: {
          fontFamily: 'monospace'
        }
      }, value));
    })), /*#__PURE__*/React.createElement(RangeSelector, _extends({
      direction: direction,
      min: 10,
      max: 20,
      size: "full",
      values: range,
      onChange: onChange
    }, rest))))
    // </Grommet>
  );
};
export var Vertical = function Vertical() {
  return /*#__PURE__*/React.createElement(SimpleRangeSelector, {
    direction: "vertical"
  });
};
export default {
  title: 'Input/RangeSelector/Vertical'
};