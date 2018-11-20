import React from 'react';
import { StyledTableRow } from '../Table/StyledTable';

var TableRow = function TableRow(props) {
  return React.createElement(StyledTableRow, props);
};

var TableRowDoc;

if (process.env.NODE_ENV !== 'production') {
  TableRowDoc = require('./doc').doc(TableRow); // eslint-disable-line global-require
}

var TableRowWrapper = TableRowDoc || TableRow;
export { TableRowWrapper as TableRow };