import React from 'react';
import PropTypes from 'prop-types';
import { StyledTableRow } from '../Table/StyledTable';

const TableRow = props => <StyledTableRow {...props} />;

let TableRowDoc;
if (process.env.NODE_ENV !== 'production') {
  TableRowDoc = require('./doc').doc(TableRow); // eslint-disable-line global-require
}
const TableRowWrapper = TableRowDoc || TableRow;

export { TableRowWrapper as TableRow };

/* PropTypes for UXPin Merge */
TableRow.propTypes = {
  children: PropTypes.node,
};

/* Export for UXPin Merge */
export default TableRow;