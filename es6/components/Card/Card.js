function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';
var Card = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$card$hover;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Box, _extends({
    overflow: "hidden",
    kind: _extends({
      hover: (_theme$card$hover = theme.card.hover) == null ? void 0 : _theme$card$hover.container
    }, theme.card.container),
    ref: ref
  }, theme.card.container, rest));
});
Card.displayName = 'Card';
export { Card };