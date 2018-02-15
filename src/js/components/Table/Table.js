import React, { Component } from 'react';
import { compose } from 'recompose';

import { Text } from '../Text';
import { withTheme } from '../hocs';

import StyledTable, { StyledTableDataCell, StyledTableHeaderCell } from './StyledTable';
import TableCell from './TableCell';
import doc from './doc';

class Table extends Component {
  static defaultProps = { columns: [], data: [] }

  render() {
    const { columns, data, ...rest } = this.props;
    const includeHeader = columns.some(column => (column.label || column.header));
    return (
      <StyledTable {...rest}>
        {includeHeader ? (
          <thead>
            <tr>
              {columns.map((column, index) => (
                <StyledTableHeaderCell key={index}>
                  {column.header || (
                    <TableCell><Text>{column.label}</Text></TableCell>
                  )}
                </StyledTableHeaderCell>
              ))}
            </tr>
          </thead>
        ) : null}

        <tbody>
          {data.map((datum, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <StyledTableDataCell key={columnIndex}>
                  {column.renderData ? column.renderData(datum) :
                  <TableCell><Text>{datum[column.property]}</Text></TableCell>}
                </StyledTableDataCell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Table);
}

export default compose(
  withTheme,
)(Table);
