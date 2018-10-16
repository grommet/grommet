import React from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { withTheme } from '../hocs';
import { normalizeColor } from '../../utils';

const ExpanderCell = ({
  context, expanded, onToggle, theme, ...rest
}) => {
  const ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
  if (onToggle) {
    return (
      <TableCell
        size='xxsmall'
        plain
        verticalAlign='top'
      >
        <Button
          fill
          a11yTitle={expanded ? 'collapse' : 'expand'}
          hoverIndicator
          disabled={!onToggle}
          onClick={onToggle}
        >
          <Box {...theme.dataTable[context]} {...rest} pad='xsmall'>
            <ExpandIcon color={normalizeColor('border', theme)} />
          </Box>
        </Button>
      </TableCell>
    );
  }
  return (
    <TableCell size='xxsmall' verticalAlign='top' />
  );
};

const ExpanderCellWrapper = compose(
  withTheme,
)(ExpanderCell);

export { ExpanderCellWrapper as ExpanderCell };
