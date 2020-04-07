import React, { forwardRef } from 'react';

import { StyledTableRow } from '../Table/StyledTable';

const TableRow = forwardRef((props, ref) => (
  <StyledTableRow ref={ref} {...props} />
));

TableRow.displayName = 'TableRow';

let TableRowDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableRowDoc = require('./doc').doc(TableRow);
}
const TableRowWrapper = TableRowDoc || TableRow;

export { TableRowWrapper as TableRow };
