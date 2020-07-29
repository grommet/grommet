function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
var TableBodyDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableBodyDoc = require('./doc').doc(TableBody);
}

var TableBodyWrapper = TableBodyDoc || TableBody;
export { TableBodyWrapper as TableBody };