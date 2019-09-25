import React from 'react';

import { StyledTableRow } from '../Table/StyledTable';

const TableRow = props => <StyledTableRow {...props} />;

let TableRowDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableRowDoc = require('./doc').doc(TableRow);
}
const TableRowWrapper = TableRowDoc || TableRow;

export { TableRowWrapper as TableRow };
