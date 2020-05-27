function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { StyledTableRow } from '../Table/StyledTable';
var TableRow = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(StyledTableRow, _extends({
    ref: ref
  }, props));
});
TableRow.displayName = 'TableRow';
var TableRowDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableRowDoc = require('./doc').doc(TableRow);
}

var TableRowWrapper = TableRowDoc || TableRow;
export { TableRowWrapper as TableRow };