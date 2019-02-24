import React from 'react';
import PropTypes from 'prop-types';
import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';

const TableHeader = props => (
  <TableContext.Provider value="header">
    <StyledTableHeader {...props} />
  </TableContext.Provider>
);

let TableHeaderDoc;
if (process.env.NODE_ENV !== 'production') {
  TableHeaderDoc = require('./doc').doc(TableHeader); // eslint-disable-line global-require
}
const TableHeaderWrapper = TableHeaderDoc || TableHeader;

export { TableHeaderWrapper as TableHeader };

/* PropTypes for UXPin Merge */
TableHeader.propTypes = {
  children: PropTypes.node,
};

/* Export for UXPin Merge */
export default TableHeader;