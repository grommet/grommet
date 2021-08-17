function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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