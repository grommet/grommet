function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';
var Footer = function Footer(_ref) {
  var _theme$footer;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: "footer",
    align: "center",
    direction: "row",
    flex: false,
    gap: (_theme$footer = theme.footer) == null ? void 0 : _theme$footer.gap,
    justify: "between"
  }, rest));
};
export { Footer };