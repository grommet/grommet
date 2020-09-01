import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';

const ExpanderCell = ({ context, expanded, onToggle, ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  let content;
  if (onToggle) {
    const ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = <ExpandIcon color={normalizeColor('border', theme)} />;
  }
  const normalizedThemeProps = {
    ...theme.table[context],
    ...theme.dataTable[context],
  };
  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = (
    <Box {...normalizedThemeProps} {...rest} align="center" pad="xsmall">
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
        plain
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
      pad="none"
    >
      {content}
    </TableCell>
  );
};

ExpanderCell.displayName = 'ExpanderCell';

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);

export { ExpanderCell };
