import React from 'react';

import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

const select = (selected, index, onChange) => () => {
  const atIndex = selected.indexOf(index);
  if (atIndex === -1) {
    onChange([...selected, index], index);
  } else {
    const nextSelected = selected.slice(0);
    nextSelected.splice(atIndex, 1);
    onChange(nextSelected, index);
  }
};

export const Body = ({
  columns,
  data,
  onChange,
  onMore,
  primaryProperty,
  selected,
  size,
  theme,
  ...rest
}) => (
  <StyledDataTableBody size={size} {...rest}>
    <InfiniteScroll
      items={data}
      onMore={onMore}
      scrollableAncestor="window"
      renderMarker={marker => (
        <TableRow>
          <TableCell>{marker}</TableCell>
        </TableRow>
      )}
    >
      {(datum, index) => {
        // convert selected array into an object
        const selection = {};
        if (selected) {
          selected.forEach(i => {
            selection[i] = true;
          });
        }
        return (
          <StyledDataTableRow
            key={datum[primaryProperty]}
            size={size}
            selectable={!!onChange}
            onClick={onChange ? select(selected, index, onChange) : undefined}
          >
            {columns.map(column => (
              <Cell
                key={column.property || column.selection}
                context="body"
                column={column}
                datum={datum}
                onChange={select(selected, index, onChange)}
                primaryProperty={primaryProperty}
                selected={selection[index] || false}
                scope={
                  column.primary || column.property === primaryProperty
                    ? 'row'
                    : undefined
                }
              />
            ))}
          </StyledDataTableRow>
        );
      }}
    </InfiniteScroll>
  </StyledDataTableBody>
);
