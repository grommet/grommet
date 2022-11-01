function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { SelectOption } from './StyledSelect';
export var EmptySearchOption = function EmptySearchOption(_ref) {
  var emptySearchMessage = _ref.emptySearchMessage,
    selectOptionsStyle = _ref.selectOptionsStyle,
    theme = _ref.theme;
  return /*#__PURE__*/React.createElement(SelectOption, {
    key: "search_empty",
    tabIndex: "0",
    role: "menuitem",
    hoverIndicator: "background",
    disabled: true
  }, /*#__PURE__*/React.createElement(Box, selectOptionsStyle, /*#__PURE__*/React.createElement(Text, _extends({
    "aria-live": "polite",
    role: "alert"
  }, theme.select.container.text), emptySearchMessage)));
};