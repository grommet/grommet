import React from 'react';
import { Blank } from 'grommet-icons/icons/Blank';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

// ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.
const ExpanderControl = ({
  context,
  expanded,
  onToggle,
  pad,
  rowExpandLabel,
  ...rest
}) => {
  const { theme } = useThemeValue();

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
    let a11yTitle;
    if (rowExpandLabel) {
      a11yTitle = `${expanded ? 'collapse' : 'expand'} ${rowExpandLabel}`;
    } else {
      a11yTitle = expanded ? 'collapse' : 'expand';
    }
    content = (
      <Button
        fill
        aria-expanded={expanded ? 'true' : 'false'}
        a11yTitle={a11yTitle}
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

const ExpanderCell = ({
  background,
  border,
  context,
  rowExpandLabel,
  ...rest
}) => (
  <TableCell
    background={background}
    border={border}
    size="xxsmall"
    plain="noPad"
    verticalAlign={context === 'groupEnd' ? 'bottom' : 'top'}
  >
    <ExpanderControl
      context={context}
      rowExpandLabel={rowExpandLabel}
      {...rest}
    />
  </TableCell>
);
ExpanderCell.displayName = 'ExpanderCell';

export { ExpanderCell };
