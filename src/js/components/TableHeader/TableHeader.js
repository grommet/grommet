import React from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';

const TableHeader = props => (
  <TableContext.Provider value="header">
    <StyledTableHeader {...props} />
  </TableContext.Provider>
);

let TableHeaderDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableHeaderDoc = require('./doc').doc(TableHeader);
}
const TableHeaderWrapper = TableHeaderDoc || TableHeader;

export { TableHeaderWrapper as TableHeader };
