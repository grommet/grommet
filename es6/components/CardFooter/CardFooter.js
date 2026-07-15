function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Footer } from '../Footer';
import { useThemeValue } from '../../utils/useThemeValue';

// Needs to have a CardBody or a flex container when Card uses a fixed height.
var CardFooter = function CardFooter(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Footer, _extends({}, theme.card.footer, rest));
};
export { CardFooter };