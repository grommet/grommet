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
var TableHeaderDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableHeaderDoc = require('./doc').doc(TableHeader);
}

var TableHeaderWrapper = TableHeaderDoc || TableHeader;
export { TableHeaderWrapper as TableHeader };