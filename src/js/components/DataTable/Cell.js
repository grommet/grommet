import React from 'react';

import { TableCell } from '../TableCell';
import { Text } from '../Text';

export const Cell = ({
  column: {
    align, property, primary, render,
  }, context, datum, scope, theme,
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
      content = <Text><strong>{content}</strong></Text>;
    }
    content = <Text>{content}</Text>;
  }

  return (
    <TableCell
      scope={scope}
      {...theme.dataTable[context]}
      align={align}
    >
      {content}
    </TableCell>
  );
};
