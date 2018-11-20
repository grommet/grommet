import React from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';

var TableHeader = function TableHeader(props) {
  return React.createElement(TableContext.Provider, {
    value: "header"
  }, React.createElement(StyledTableHeader, props));
};

var TableHeaderDoc;

if (process.env.NODE_ENV !== 'production') {
  TableHeaderDoc = require('./doc').doc(TableHeader); // eslint-disable-line global-require
}

var TableHeaderWrapper = TableHeaderDoc || TableHeader;
export { TableHeaderWrapper as TableHeader };