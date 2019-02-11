import React, { Component } from 'react';

import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

export class Body extends Component {
  state = { rowIndex: 1 };

  rowRefs = [];

  onNext = () => {
    const { data } = this.props;
    const { rowIndex } = this.state;
    if (rowIndex < data.length - 1) {
      const nextIndex = rowIndex + 1;
      this.setState({ rowIndex: nextIndex }, () => {
        this.rowRefs[nextIndex].focus();
      });
    }
  };

  onPrevious = () => {
    const { rowIndex } = this.state;
    if (rowIndex > 0) {
      const nextIndex = rowIndex - 1;
      this.setState({ rowIndex: nextIndex }, () => {
        this.rowRefs[nextIndex].focus();
      });
    }
  };

  render() {
    const {
      columns,
      data,
      onMore,
      checked,
      primaryProperty,
      size,
      theme,
      onClick,
      onRowClick,
      selectable,
      ...rest
    } = this.props;

    return (
      <Keyboard onUp={this.onNext} onDown={this.onPrevious}>
        <StyledDataTableBody ref={this.rowsRef} size={size} {...rest}>
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
            {(datum, index) => (
              <StyledDataTableRow
                onClick={event => onClick(event, datum)}
                key={datum[primaryProperty]}
                size={size}
                hoverIndicator={selectable || onRowClick !== undefined}
                ref={ref => {
                  this.rowRefs[index] = ref;
                }}
              >
                {columns.map(column => (
                  <Cell
                    key={column.property}
                    context="body"
                    column={column}
                    datum={datum}
                    isChecked={checked.indexOf(datum[primaryProperty]) !== -1}
                    onClick={event => onClick(event, datum)}
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
      </Keyboard>
    );
  }
}
