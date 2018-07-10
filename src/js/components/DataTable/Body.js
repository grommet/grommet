import React from 'react';

import { TableRow, TableCell } from '../Table';
import { InfiniteScroll } from '../InfiniteScroll';

import Cell from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

const Body = ({ columns, data, primaryProperty, size, theme, ...rest }) => (
  <StyledDataTableBody size={size} theme={theme} {...rest}>
    <InfiniteScroll
      items={data}
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

export default Body;
