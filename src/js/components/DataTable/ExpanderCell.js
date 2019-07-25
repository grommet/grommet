import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';

const ExpanderCell = ({ context, expanded, onToggle, theme, ...rest }) => {
  let content;
  if (onToggle) {
    const ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = <ExpandIcon color={normalizeColor('border', theme)} />;
  }
  content = (
    <Box
      {...{ ...theme.table[context], ...theme.dataTable[context] }}
      {...rest}
      align="center"
      pad="xsmall"
    >
      {content}
    </Box>
  );
  if (onToggle) {
    content = (
      <Button
        fill
        a11yTitle={expanded ? 'collapse' : 'expand'}
        hoverIndicator
        disabled={!onToggle}
        onClick={onToggle}
      >
        {content}
      </Button>
    );
  }
  return (
    <TableCell
      size="xxsmall"
      plain
      verticalAlign={context === 'groupEnd' ? 'bottom' : 'top'}
    >
      {content}
    </TableCell>
  );
};

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);

const ExpanderCellWrapper = compose(withTheme)(ExpanderCell);

export { ExpanderCellWrapper as ExpanderCell };
