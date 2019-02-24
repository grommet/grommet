import * as React from 'react';
import Table from '../Table';
import TableHeader from '../../TableHeader/TableHeader';
import TableRow from '../../TableRow/TableRow';
import TableCell from '../../TableCell/TableCell';
import TableBody from '../../TableBody/TableBody';

export default (
  <Table uxpId="table0">
    <TableHeader uxpId="tableheader0">
      <TableRow uxpId="tableheaderrow0">
        <TableCell scope="col" border="bottom" uxpId="tableheadercell0">
          Name
        </TableCell>
        <TableCell scope="col" border="bottom" uxpId="tableheadercell1">
          Flavor
        </TableCell>
      </TableRow>
    </TableHeader>
    <TableBody uxpId="tablebody0">
      <TableRow uxpId="tablebodyrow0">
        <TableCell scope="row" uxpId="tablebodycell0">
          Eric
        </TableCell>
        <TableCell uxpId="tablebodycell0">Coconut</TableCell>
      </TableRow>
      <TableRow uxpId="tablebodyrow1">
        <TableCell scope="row" uxpId="tablebodycell1">
          Chris
        </TableCell>
        <TableCell uxpId="tablebodycell2">Watermelon</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
