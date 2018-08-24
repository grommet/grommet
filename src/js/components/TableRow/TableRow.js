import React from 'react';

import { StyledTableRow } from '../Table/StyledTable';
import { doc } from './doc';

const TableRow = props => <StyledTableRow {...props} />;

const TableRowWrapper = process.env.NODE_ENV !== 'production' ? doc(TableRow) : TableRow;

export { TableRowWrapper as TableRow };

