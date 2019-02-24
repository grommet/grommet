import React from 'react';
import PropTypes from 'prop-types';
import { StyledTable, StyledTableDataCaption } from './StyledTable';

const Table = ({ caption, children, ...rest }) => (
  <StyledTable {...rest}>
    {caption ? (
      <StyledTableDataCaption>{caption}</StyledTableDataCaption>
    ) : null}
    {children}
  </StyledTable>
);

let TableDoc;
if (process.env.NODE_ENV !== 'production') {
  TableDoc = require('./doc').doc(Table); // eslint-disable-line global-require
}
const TableWrapper = TableDoc || Table;

export { TableWrapper as Table };

/* PropTypes for UXPin Merge */
Table.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  caption: PropTypes.string,
}

/* Export default for UXPin Merge */
export default Table;