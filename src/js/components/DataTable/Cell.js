import React from 'react';

import { TableCell } from '../TableCell';
import { Text } from '../Text';

export const Cell = ({
  column: { align, property, primary, render },
  context,
  datum,
  scope,
  theme,
}) => {
  let content;
  if (render) {
    content = render(datum);
  } else if (datum[property] !== undefined) {
    content = datum[property];
  }

  if (typeof content === 'string' || typeof content === 'number') {
    const textProps = primary ? theme.dataTable.primary : {};
    content = <Text {...textProps}>{content}</Text>;
  }

  return (
    <TableCell scope={scope} {...theme.dataTable[context]} align={align}>
      {content}
    </TableCell>
  );
};
