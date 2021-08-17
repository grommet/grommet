function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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