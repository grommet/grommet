import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor, keepKeys } from '../../utils';
import { boxProps } from '../Box/doc';

const ExpanderCell = ({ context, expanded, onToggle, theme, ...rest }) => {
  const ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
  if (onToggle) {
    return (
      <TableCell size="xxsmall" plain verticalAlign="top">
        <Button
          fill
          a11yTitle={expanded ? 'collapse' : 'expand'}
          hoverIndicator
          disabled={!onToggle}
          onClick={onToggle}
        >
          <Box
            {...keepKeys(
              { ...theme.table[context], ...theme.dataTable[context] },
              boxProps,
            )}
            {...keepKeys(rest, boxProps)}
            align="center"
            pad="xsmall"
          >
            <ExpandIcon color={normalizeColor('border', theme)} />
          </Box>
        </Button>
      </TableCell>
    );
  }
  return <TableCell size="xxsmall" verticalAlign="top" />;
};

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);

const ExpanderCellWrapper = compose(withTheme)(ExpanderCell);

export { ExpanderCellWrapper as ExpanderCell };
