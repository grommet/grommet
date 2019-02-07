import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { CheckBox } from '../CheckBox';
import { TableCell } from '../TableCell';
import { Text } from '../Text';

const Cell = ({
  column: { align, property, render },
  context,
  datum,
  primaryProperty,
  isChecked,
  isIndeterminate,
  onClick,
  scope,
  theme,
}) => {
  if (property === 'checkbox') {
    if (context === 'footer') {
      return (
        <TableCell
          scope={scope}
          {...theme.dataTable[context]}
          align={align || 'start'}
        />
      );
    }
    return (
      <TableCell
        scope={scope}
        {...theme.dataTable[context]}
        align={align || 'start'}
      >
        <CheckBox
          checked={isChecked}
          indeterminate={!isChecked && isIndeterminate}
          onChange={onClick}
        />
      </TableCell>
    );
  }

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
