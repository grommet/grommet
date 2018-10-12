import React from 'react';

import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

export const Body = ({
  columns, data, onMore, primaryProperty, size, theme, ...rest
}) => (
  <StyledDataTableBody size={size} theme={theme} {...rest}>
    <InfiniteScroll
      items={data}
      onMore={onMore}
      scrollableAncestor='window'
      renderMarker={marker => (
        <TableRow><TableCell>{marker}</TableCell></TableRow>
      )}
    >
      {datum => (
        <StyledDataTableRow key={datum[primaryProperty]} size={size}>
          {columns.map(column => (
            <Cell
              key={column.property}
              context='body'
              column={column}
              datum={datum}
              scope={column.primary ? 'row' : undefined}
              theme={theme}
            />
          ))}
        </StyledDataTableRow>
      )}
    </InfiniteScroll>
  </StyledDataTableBody>
);
