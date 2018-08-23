import React from 'react';

import { Box } from '../Box';
import { TableCell } from '../TableCell';
import { Text } from '../Text';

export const Cell = ({
  column: { align, property, primary, render }, context, datum, scope, theme,
  ...rest
}) => {
  let content;
  if (render) {
    if (datum[property]) {
      content = render(datum);
    }
  } else if (datum[property]) {
    content = datum[property];
  }

  if (typeof content === 'string' || typeof content === 'number') {
    if (primary) {
      content = <strong>{content}</strong>;
    }
    content = <Text>{content}</Text>;
  }

  if (theme.dataTable[context]) {
    content = (
      <Box
        direction='row'
        justify={align}
        fill='vertical'
        {...theme.dataTable[context]}
        {...rest}
      >
        {content}
      </Box>
    );
  }

  return (
    <TableCell
      scope={scope}
      plain={!!theme.dataTable[context]}
      verticalAlign={context === 'header' ? 'bottom' : 'top'}
    >
      {content}
    </TableCell>
  );
};
