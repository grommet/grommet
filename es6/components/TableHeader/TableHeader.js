import React from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';

var TableHeader = function TableHeader(props) {
  return /*#__PURE__*/React.createElement(TableContext.Provider, {
    value: "header"
  }, /*#__PURE__*/React.createElement(StyledTableHeader, props));
};

var TableHeaderDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableHeaderDoc = require('./doc').doc(TableHeader);
}

var TableHeaderWrapper = TableHeaderDoc || TableHeader;
export { TableHeaderWrapper as TableHeader };