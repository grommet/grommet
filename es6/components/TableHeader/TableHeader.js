function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';
var TableHeader = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(TableContext.Provider, {
    value: "header"
  }, /*#__PURE__*/React.createElement(StyledTableHeader, _extends({
    ref: ref
  }, props)));
});
TableHeader.displayName = 'TableHeader';
export { TableHeader };