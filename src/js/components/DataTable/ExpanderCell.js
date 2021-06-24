import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Blank } from 'grommet-icons/icons/Blank';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';

// ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.
const ExpanderControl = ({ context, expanded, onToggle, pad, ...rest }) => {
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
    <Box {...normalizedThemeProps} {...rest} align="center" fill pad={pad}>
      {content}
    </Box>
  );

  if (onToggle) {
    content = (
      <Button
        fill
        a11yTitle={expanded ? 'collapse' : 'expand'}
        hoverIndicator
        onClick={onToggle}
        plain
      >
        {content}
      </Button>
    );
  }

  return content;
};

const ExpanderCell = ({ background, border, context, ...rest }) => (
  <TableCell
    background={background}
    border={border}
    size="xxsmall"
    plain="noPad"
    verticalAlign={context === 'groupEnd' ? 'bottom' : 'top'}
  >
    <ExpanderControl context={context} {...rest} />
  </TableCell>
);

ExpanderCell.displayName = 'ExpanderCell';

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);

export { ExpanderCell };
