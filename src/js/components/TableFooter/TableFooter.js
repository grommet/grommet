import React, { forwardRef } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';

const TableFooter = forwardRef((props, ref) => (
  <TableContext.Provider value="footer">
    <StyledTableFooter ref={ref} {...props} />
  </TableContext.Provider>
));

TableFooter.displayName = 'TableFooter';

let TableFooterDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableFooterDoc = require('./doc').doc(TableFooter);
}
const TableFooterWrapper = TableFooterDoc || TableFooter;

export { TableFooterWrapper as TableFooter };
