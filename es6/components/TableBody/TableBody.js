import React from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';

var TableBody = function TableBody(props) {
  return React.createElement(TableContext.Provider, {
    value: "body"
  }, React.createElement(StyledTableBody, props));
};

var TableBodyDoc;

if (process.env.NODE_ENV !== 'production') {
  TableBodyDoc = require('./doc').doc(TableBody); // eslint-disable-line global-require
}

var TableBodyWrapper = TableBodyDoc || TableBody;
export { TableBodyWrapper as TableBody };