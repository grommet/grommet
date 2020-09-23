import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Text } from '../Text';
import { StyledDataTableCell } from './StyledDataTable';
import { datumValue } from './buildState';

const normalizeProp = (name, rowProp, prop) => {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};

const Cell = ({
  background,
  border,
  column: { align, pin: columnPin, property, render, verticalAlign, size },
  context,
  datum,
  index,
  pad,
  pin: cellPin,
  primaryProperty,
  rowProp,
  scope,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
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

  let pin;
  if (cellPin) pin = cellPin;
  else if (columnPin) pin = ['left'];

  return (
    <StyledDataTableCell
      scope={scope}
      {...theme.dataTable[context]}
      align={align}
      context={context}
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
      pin={pin}
    >
      {content}
    </StyledDataTableCell>
  );
};

Cell.displayName = 'Cell';

Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);

export { Cell };
