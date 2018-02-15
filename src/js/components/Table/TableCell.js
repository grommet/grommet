import React from 'react';

import { Box } from '../Box';

const TableCell = props => <Box {...props} />;

TableCell.defaultProps = {
  align: 'start',
  pad: { horizontal: 'small', vertical: 'xsmall' },
};

export default TableCell;
