import React from 'react';

import { TableRow, TableBody, TableCell } from '../Table';

import CellContent from './CellContent';

const Body = ({ bodyProps, columns, data, primaryProperty }) => (
  <TableBody>
    {data.map(datum => (
      <TableRow key={datum[primaryProperty]}>
        {columns.map(({ property, primary, render, align }) => (
          <TableCell
            key={property}
            scope={primary ? 'row' : undefined}
            align={align}
            {...bodyProps}
          >
            <CellContent
              datum={datum}
              property={property}
              render={render}
              primary={primary}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

export default Body;
