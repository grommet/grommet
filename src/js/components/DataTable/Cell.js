import React, { isValidElement, memo, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Text } from '../Text';
import { StyledDataTableCell } from './StyledDataTable';
import { datumValue } from './buildState';
import { TableContext } from '../Table/TableContext';

const Cell = memo(
  ({
    background,
    border,
    column: {
      align,
      pin: columnPin,
      plain,
      footer,
      property,
      render,
      verticalAlign: columnVerticalAlign, // deprecate in v3
      size,
    },
    datum,
    pad,
    pin: cellPin,
    pinnedOffset,
    primaryProperty,
    scope,
    verticalAlign,
    ...rest
  }) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const value = datumValue(datum, property);
    const context = useContext(TableContext);
    const renderContexts =
      context === 'body' ||
      (context === 'footer' && footer && footer.aggregate);

    let content;
    if (render && renderContexts) {
      content = render(datum);
    } else if (value !== undefined) {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        isValidElement(value)
      )
        content = value;
    }

    if (typeof content === 'string' || typeof content === 'number') {
      const textProps =
        property === primaryProperty ? theme.dataTable.primary : {};
      content = <Text {...textProps}>{content}</Text>;
    }

    const pin = [];
    if (cellPin) pin.push(...cellPin);
    if (columnPin) pin.push('left');

    return (
      <StyledDataTableCell
        scope={scope}
        {...theme.dataTable[context]}
        align={align}
        context={context}
        verticalAlign={verticalAlign || columnVerticalAlign}
        size={size}
        background={background}
        pinnedOffset={pinnedOffset}
        border={border}
        pad={pad}
        pin={pin}
        plain={plain ? 'noPad' : undefined}
        {...rest}
      >
        {content}
      </StyledDataTableCell>
    );
  },
);

Cell.displayName = 'Cell';

Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);

export { Cell };
