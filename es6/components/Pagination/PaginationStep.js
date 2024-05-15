var _excluded = ["messages", "onChange", "options", "step"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Select } from '../Select';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
export var PaginationStep = function PaginationStep(_ref) {
  var messages = _ref.messages,
    onChange = _ref.onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [10, 25, 50, 100] : _ref$options,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(MessageContext),
    formatMessage = _useContext.format;
  var theme = useContext(ThemeContext);
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