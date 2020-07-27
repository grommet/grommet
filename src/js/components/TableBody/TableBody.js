import React, { forwardRef } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';

const TableBody = forwardRef((props, ref) => (
  <TableContext.Provider value="body">
    <StyledTableBody ref={ref} {...props} />
  </TableContext.Provider>
));

TableBody.displayName = 'TableBody';

let TableBodyDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableBodyDoc = require('./doc').doc(TableBody);
}
const TableBodyWrapper = TableBodyDoc || TableBody;

export { TableBodyWrapper as TableBody };
