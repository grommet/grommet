import React from 'react';

import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

export const Body = ({
  columns,
  data,
  onMore,
  primaryProperty,
  size,
  step,
  theme,
  ...rest
}) => (
  <StyledDataTableBody size={size} {...rest}>
    <InfiniteScroll
      items={data}
      onMore={onMore}
      renderMarker={marker => (
        <TableRow>
          <TableCell>{marker}</TableCell>
        </TableRow>
      )}
      scrollableAncestor="window"
      step={step}
    >
      {datum => (
        <StyledDataTableRow key={datum[primaryProperty]} size={size}>
          {columns.map(column => (
            <Cell
              key={column.property}
              context="body"
              column={column}
              datum={datum}
              primaryProperty={primaryProperty}
              scope={
                column.primary || column.property === primaryProperty
                  ? 'row'
                  : undefined
              }
            />
          ))}
        </StyledDataTableRow>
      )}
    </InfiniteScroll>
  </StyledDataTableBody>
);
