import React from 'react';

import { TableRow, TableFooter, TableCell } from '../Table';

import CellContent from './CellContent';

const Footer = ({ columns, footerProps, footerValues, groups }) => (
  <TableFooter>
    <TableRow>
      {groups ? <TableCell size='xxsmall' {...footerProps} /> : null}
      {columns.map(({ property, footer, render, align }) => (
        <TableCell key={property} {...footerProps} align={align}>
          {footer ?
            <CellContent datum={footerValues} property={property} render={render} />
          : null}
        </TableCell>
      ))}
    </TableRow>
  </TableFooter>
);

export default Footer;
