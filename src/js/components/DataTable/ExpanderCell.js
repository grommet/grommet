import React, { useContext } from 'react';
import { Blank } from 'grommet-icons/icons/Blank';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { MessageContext } from '../../contexts/MessageContext';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

// ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.
const ExpanderControl = ({
  context,
  expanded,
  onToggle,
  pad,
  expandAriaLabel,
  ...rest
}) => {
  const { theme } = useThemeValue();
  const { format } = useContext(MessageContext);

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
    const expandText = format({
      id: 'dataTable.expand',
      messages: { 'dataTable.expand': 'expand' },
    });
    const collapseText = format({
      id: 'dataTable.collapse',
      messages: { 'dataTable.collapse': 'collapse' },
    });

    let a11yTitle = expanded ? collapseText : expandText;
    if (expandAriaLabel) a11yTitle = `${a11yTitle} ${expandAriaLabel}`;
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
  expandAriaLabel,
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
      expandAriaLabel={expandAriaLabel}
      {...rest}
    />
  </TableCell>
);
ExpanderCell.displayName = 'ExpanderCell';

export { ExpanderCell };
