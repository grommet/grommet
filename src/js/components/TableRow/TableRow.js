import React from 'react';

import { StyledTableRow } from '../Table/StyledTable';
import { doc } from './doc';

const TableRow = props => <StyledTableRow {...props} />;

let TableRowWrapper = TableRow;
if (process.env.NODE_ENV !== 'production') {
  TableRowWrapper = doc(TableRowWrapper);
}

export { TableRowWrapper as TableRow };
