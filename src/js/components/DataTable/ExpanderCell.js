import React from 'react';
import { compose } from 'recompose';

import { TableCell } from '../Table';
import { Button } from '../Button';
import { Box } from '../Box';
import { withTheme } from '../hocs';

const ExpanderCell = ({ context, expanded, onToggle, theme, ...rest }) => {
  const ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
  if (onToggle) {
    return (
      <TableCell
        size='xxsmall'
        plain={true}
        verticalAlign='top'
      >
        <Button
          fill={true}
          a11yTitle={expanded ? 'collapse' : 'expand'}
          hoverIndicator={true}
          onClick={onToggle}
        >
          <Box {...theme.dataTable[context]} {...rest} pad='xsmall'>
            <ExpandIcon color={theme.dark ? 'border-dark' : 'border-light'} />
          </Box>
        </Button>
      </TableCell>
    );
  }
  return (
    <TableCell size='xxsmall' verticalAlign='top' />
  );
};

export default compose(
  withTheme,
)(ExpanderCell);
