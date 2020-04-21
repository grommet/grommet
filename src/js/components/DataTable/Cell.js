import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { TableCell } from '../TableCell';
import { Text } from '../Text';
import { datumValue } from './buildState';

const normalizeProp = (name, rowProp, prop) => {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};

const Cell = ({
  background,
  border,
  column: { align, property, render, verticalAlign, size },
  context,
  datum,
  index,
  pad,
  primaryProperty,
  rowProp,
  scope,
}) => {
  const theme = useContext(ThemeContext);
  const value = datumValue(datum, property);
  let content;
  if (render) {
    content = render(datum);
  } else if (value !== undefined) {
    content = value;
  }

  if (typeof content === 'string' || typeof content === 'number') {
    const textProps =
      property === primaryProperty ? theme.dataTable.primary : {};
    content = <Text {...textProps}>{content}</Text>;
  }

  return (
    <TableCell
      scope={scope}
      {...theme.dataTable[context]}
      align={align}
      verticalAlign={verticalAlign}
      size={size}
      background={normalizeProp(
        'background',
        rowProp,
        Array.isArray(background)
          ? background[index % background.length]
          : background,
      )}
      border={normalizeProp('border', rowProp, border)}
      pad={normalizeProp('pad', rowProp, pad)}
    >
      {content}
    </TableCell>
  );
};

Cell.displayName = 'Cell';

Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);

export { Cell };
