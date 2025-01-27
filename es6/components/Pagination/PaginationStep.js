var _excluded = ["messages", "onChange", "options", "step"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext } from 'react';
import { Box } from '../Box';
import { Select } from '../Select';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
export var PaginationStep = function PaginationStep(_ref) {
  var messages = _ref.messages,
    onChange = _ref.onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [10, 25, 50, 100] : _ref$options,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(MessageContext),
    formatMessage = _useContext.format;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Box, _extends({
    direction: "row",
    align: "center",
    gap: "xsmall"
  }, rest), /*#__PURE__*/React.createElement(Text, null, formatMessage({
    id: 'pagination.stepLabel',
    messages: messages
  })), /*#__PURE__*/React.createElement(Select, {
    options: options,
    value: step,
    valueLabel: /*#__PURE__*/React.createElement(Box, _extends({}, theme.global.input, {
      pad: theme.global.input.padding
    }), /*#__PURE__*/React.createElement(Text, theme.global.input.font, step)),
    onChange: onChange
  }));
};