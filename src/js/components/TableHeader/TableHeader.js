import React, { forwardRef } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';

const TableHeader = forwardRef((props, ref) => (
  <TableContext.Provider value="header">
    <StyledTableHeader ref={ref} {...props} />
  </TableContext.Provider>
));

TableHeader.displayName = 'TableHeader';

let TableHeaderDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableHeaderDoc = require('./doc').doc(TableHeader);
}
const TableHeaderWrapper = TableHeaderDoc || TableHeader;

export { TableHeaderWrapper as TableHeader };
