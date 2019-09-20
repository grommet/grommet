import React from 'react';

import { StyledTableRow } from '../Table/StyledTable';

const TableRow = props => <StyledTableRow {...props} />;

let TableRowDoc;
if (process.env.NODE_ENV !== 'production') {
  TableRowDoc = require('./doc').doc(TableRow); // eslint-disable-line global-require
}
const TableRowWrapper = TableRowDoc || TableRow;

export { TableRowWrapper as TableRow };
