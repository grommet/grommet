import React from 'react';
import { StyledTableRow } from '../Table/StyledTable';

var TableRow = function TableRow(props) {
  return React.createElement(StyledTableRow, props);
};

var TableRowDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableRowDoc = require('./doc').doc(TableRow);
}

var TableRowWrapper = TableRowDoc || TableRow;
export { TableRowWrapper as TableRow };