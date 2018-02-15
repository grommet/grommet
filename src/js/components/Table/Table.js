import React, { Component } from 'react';
import { compose } from 'recompose';

import { Text } from '../Text';
import { withTheme } from '../hocs';

import StyledTable, {
  StyledTableDataCaption, StyledTableDataCell, StyledTableFooterCell, StyledTableHeaderCell,
} from './StyledTable';
import TableCell from './TableCell';
import doc from './doc';

class Table extends Component {
  static defaultProps = { columns: [], data: [] }

  render() {
    const { caption, columns, data, theme, ...rest } = this.props;
    const includeHeader = columns.some(column => (column.label || column.header));
    const includeFooter = columns.some(column => (column.footer));
    return (
      <StyledTable theme={theme} {...rest}>
        {caption ? <StyledTableDataCaption>{caption}</StyledTableDataCaption> : null}
        {includeHeader ? (
          <thead>
            <tr>
              {columns.map((column, index) => (
                <StyledTableHeaderCell
                  key={index}
                  basis={column.basis}
                  theme={theme}
                  scope='col'
                >
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
              {columns.map((column, columnIndex) => {
                const Cell = column.dataHeader ? StyledTableHeaderCell : StyledTableDataCell;
                return (
                  <Cell
                    key={columnIndex}
                    basis={column.basis}
                    theme={theme}
                    scope={column.dataHeader ? 'row' : undefined}
                  >
                    {column.renderData ? column.renderData(datum) :
                    <TableCell><Text>{datum[column.property]}</Text></TableCell>}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>

        {includeFooter ? (
          <tfoot>
            <tr>
              {columns.map((column, index) => (
                <StyledTableFooterCell
                  key={index}
                  basis={column.basis}
                  theme={theme}
                >
                  {column.footer}
                </StyledTableFooterCell>
              ))}
            </tr>
          </tfoot>
        ) : null}
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
