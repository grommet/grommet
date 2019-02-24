import React from 'react';
import PropTypes from 'prop-types';
import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';

const TableBody = props => (
  <TableContext.Provider value="body">
    <StyledTableBody {...props} />
  </TableContext.Provider>
);

let TableBodyDoc;
if (process.env.NODE_ENV !== 'production') {
  TableBodyDoc = require('./doc').doc(TableBody); // eslint-disable-line global-require
}
const TableBodyWrapper = TableBodyDoc || TableBody;

export { TableBodyWrapper as TableBody };

/* PropTypes for UXPin Merge */
TableBody.propTypes = {
  children: PropTypes.node,
}

/* Export default for UXPin Merge */
export default TableBody;
