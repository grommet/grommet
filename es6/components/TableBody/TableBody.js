function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';
var TableBody = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(TableContext.Provider, {
    value: "body"
  }, /*#__PURE__*/React.createElement(StyledTableBody, _extends({
    ref: ref
  }, props)));
});
TableBody.displayName = 'TableBody';
export { TableBody };