function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { elevationStyle } from '../Box/StyledBox';
var StyledCard = styled(Box).withConfig({
  displayName: "Card__StyledCard",
  componentId: "sc-14tum25-0"
})(["&:hover{", " ", "}"], function (props) {
  var _props$theme$card$hov, _props$theme$card$hov2;

  return props.onClick && ((_props$theme$card$hov = props.theme.card.hover) == null ? void 0 : (_props$theme$card$hov2 = _props$theme$card$hov.container) == null ? void 0 : _props$theme$card$hov2.elevation) && elevationStyle(props.theme.card.hover.container.elevation);
}, function (props) {
  var _props$theme$card$hov3, _props$theme$card$hov4;

  return (_props$theme$card$hov3 = props.theme.card.hover) == null ? void 0 : (_props$theme$card$hov4 = _props$theme$card$hov3.container) == null ? void 0 : _props$theme$card$hov4.extend;
});
var Card = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var rest = _extends({}, _ref);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  return /*#__PURE__*/React.createElement(StyledCard, _extends({
    overflow: "hidden",
    ref: ref
  }, theme.card.container, rest));
});
Card.displayName = 'Card';
export { Card };