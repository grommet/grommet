import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { TableCell } from '../TableCell';
import { Text } from '../Text';

const Cell = ({
  column: { align, property, render },
  context,
  datum,
  primaryProperty,
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
    const textProps =
      property === primaryProperty ? theme.dataTable.primary : {};
    content = <Text {...textProps}>{content}</Text>;
  }

  return (
    <TableCell scope={scope} {...theme.dataTable[context]} align={align}>
      {content}
    </TableCell>
  );
};

Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);

const CellWrapper = compose(withTheme)(Cell);

export { CellWrapper as Cell };
