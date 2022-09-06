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
    disabled: true,
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement(Box, selectOptionsStyle, /*#__PURE__*/React.createElement(Text, theme.select.container.text, emptySearchMessage)));
};