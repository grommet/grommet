import React from 'react';
import { compose } from 'recompose';

import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

const Body = ({
  columns,
  data,
  forwardRef,
  onMore,
  onClickRow,
  primaryProperty,
  size,
  step,
  theme,
  ...rest
}) => {
  const [active, setActive] = React.useState();
  return (
    <Keyboard
      onEnter={
        onClickRow && active >= 0
          ? event => {
              event.persist();
              const adjustedEvent = event;
              adjustedEvent.datum = data[active];
              onClickRow(adjustedEvent);
            }
          : undefined
      }
      onUp={
        onClickRow && active
          ? () => {
              setActive(active - 1);
            }
          : undefined
      }
      onDown={
        onClickRow && data.length
          ? () => {
              setActive(
                active >= 0 ? Math.min(active + 1, data.length - 1) : 0,
              );
            }
          : undefined
      }
    >
      <StyledDataTableBody
        ref={forwardRef}
        size={size}
        tabIndex={onClickRow ? 0 : undefined}
        {...rest}
      >
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
          {(datum, index) => (
            <StyledDataTableRow
              key={datum[primaryProperty]}
              size={size}
              active={active >= 0 ? active === index : undefined}
              onClick={
                onClickRow
                  ? event => {
                      event.persist(); // extract from React's synthetic event pool
                      const adjustedEvent = event;
                      adjustedEvent.datum = datum;
                      onClickRow(adjustedEvent);
                    }
                  : undefined
              }
              onMouseOver={onClickRow ? () => setActive(undefined) : undefined}
              onFocus={onClickRow ? () => {} : undefined}
            >
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
    </Keyboard>
  );
};

const ButtonWrapper = compose(
  withFocus(),
  withForwardRef,
)(Body);

export { ButtonWrapper as Body };
