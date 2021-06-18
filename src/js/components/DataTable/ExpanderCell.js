import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Blank } from 'grommet-icons';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';
import { normalizeRowProp } from './buildState';

const ExpanderCell = ({
  background,
  border,
  context,
  expanded,
  onToggle,
  pad,
  rowProp,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  let content;
  if (onToggle) {
    const ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = <ExpandIcon color={normalizeColor('border', theme)} />;
  } else {
    content = <Blank />;
  }
  const normalizedThemeProps = {
    ...theme.table[context],
    ...theme.dataTable[context],
  };
  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = (
    <Box
      {...normalizedThemeProps}
      {...rest}
      align="center"
      fill
      pad={pad}
      background={background}
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
      pad="noPad"
    >
      {content}
    </TableCell>
  );
};

ExpanderCell.displayName = 'ExpanderCell';

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);

export { ExpanderCell };
