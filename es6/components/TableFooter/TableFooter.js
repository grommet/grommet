function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';
var TableFooter = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(TableContext.Provider, {
    value: "footer"
  }, /*#__PURE__*/React.createElement(StyledTableFooter, _extends({
    ref: ref
  }, props)));
});
TableFooter.displayName = 'TableFooter';
export { TableFooter };