var _excluded = ["caption", "children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef } from 'react';
import { StyledTable, StyledTableDataCaption } from './StyledTable';
import { TablePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var Table = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var caption = _ref.caption,
    children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/React.createElement(StyledTable, _extends({
    ref: ref
  }, passThemeFlag, rest), caption ? /*#__PURE__*/React.createElement(StyledTableDataCaption, passThemeFlag, caption) : null, children);
});
Table.propTypes = TablePropTypes;
export { Table };