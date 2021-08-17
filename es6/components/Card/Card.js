function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
var Card = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var rest = _extends({}, _ref);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  return /*#__PURE__*/React.createElement(Box, _extends({
    overflow: "hidden",
    ref: ref
  }, theme.card.container, rest));
});
Card.displayName = 'Card';
export { Card };