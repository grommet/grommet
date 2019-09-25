import React from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';

const TableFooter = props => (
  <TableContext.Provider value="footer">
    <StyledTableFooter {...props} />
  </TableContext.Provider>
);

let TableFooterDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableFooterDoc = require('./doc').doc(TableFooter);
}
const TableFooterWrapper = TableFooterDoc || TableFooter;

export { TableFooterWrapper as TableFooter };
