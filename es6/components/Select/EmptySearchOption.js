function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
export var EmptySearchOption = function EmptySearchOption(_ref) {
  var _theme$select, _theme$select2, _theme$select3;
  var emptySearchMessage = _ref.emptySearchMessage,
    selectOptionsStyle = _ref.selectOptionsStyle,
    theme = _ref.theme;
  return /*#__PURE__*/React.createElement(Box, (theme == null || (_theme$select = theme.select) == null || (_theme$select = _theme$select.emptySearchMessage) == null ? void 0 : _theme$select.container) || selectOptionsStyle, /*#__PURE__*/React.createElement(Text, _extends({
    "aria-live": "polite",
    role: "alert"
  }, (theme == null || (_theme$select2 = theme.select) == null || (_theme$select2 = _theme$select2.emptySearchMessage) == null ? void 0 : _theme$select2.text) || ((_theme$select3 = theme.select) == null || (_theme$select3 = _theme$select3.options) == null ? void 0 : _theme$select3.text)), emptySearchMessage));
};