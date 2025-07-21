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
  messages,
  pad,
  expandLabel,
  row,
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
    const expandText =
      messages?.expand ||
      format({
        id: 'dataTable.expand',
        messages: {
          'dataTable.expand': 'expand',
        },
      });

    const collapseText =
      messages?.collapse ||
      format({
        id: 'dataTable.collapse',
        messages: {
          'dataTable.collapse': 'collapse',
        },
      });

    const expandAllText =
      messages?.expandAll ||
      format({
        id: 'dataTable.expandAll',
        messages,
      });

    const collapseAllText =
      messages?.collapseAll ||
      format({
        id: 'dataTable.collapseAll',
        messages,
      });

    let a11yTitle;
    if (context === 'header') {
      a11yTitle = expanded ? collapseAllText : expandAllText;
    } else {
      a11yTitle = expanded ? collapseText : expandText;
    }
    if (expandLabel) {
      a11yTitle = expandLabel;
    }

    content = (
      <Button
        fill
        aria-expanded={expanded ? 'true' : 'false'}
        a11yTitle={a11yTitle}
        hoverIndicator
        // ensure focus is visible since overflow: hidden on TableCell sizeStyle
        // would otherwise clip it
        focusIndicator="inset"
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
  expandLabel,
  row,
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
      expandLabel={expandLabel}
      row={row}
      {...rest}
    />
  </TableCell>
);
ExpanderCell.displayName = 'ExpanderCell';

export { ExpanderCell };
