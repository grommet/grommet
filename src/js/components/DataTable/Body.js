import React, { forwardRef, Fragment } from 'react';

import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { ExpanderCell } from './ExpanderCell';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { datumValue } from './buildState';

const Body = forwardRef(
  (
    {
      background,
      border,
      columns,
      data,
      onMore,
      replace,
      onClickRow,
      onSelect,
      pad,
      pinnedBackground,
      primaryProperty,
      rowProps,
      selected,
      rowDetails,
      size,
      step,
      rowExpand,
      setrowExpand,
      ...rest
    },
    ref,
  ) => {
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
          ref={ref}
          size={size}
          tabIndex={onClickRow ? 0 : undefined}
          {...rest}
        >
          <InfiniteScroll
            items={data}
            onMore={onMore}
            replace={replace}
            renderMarker={marker => (
              <TableRow>
                <TableCell>{marker}</TableCell>
              </TableRow>
            )}
            scrollableAncestor="window"
            step={step}
          >
            {(datum, index, rowRef) => {
              const primaryValue = primaryProperty
                ? datumValue(datum, primaryProperty)
                : undefined;
              const isSelected = selected && selected.includes(primaryValue);
              const isrowExpanded = rowExpand && rowExpand.includes(index);
              return (
                <Fragment key={`${index.toString()}_expanded`}>
                  <StyledDataTableRow
                    key={primaryValue || index}
                    ref={rowRef}
                    size={size}
                    active={active >= 0 ? active === index : undefined}
                    onClick={
                      onClickRow
                        ? event => {
                            // extract from React's synthetic event pool
                            event.persist();
                            const adjustedEvent = event;
                            adjustedEvent.datum = datum;
                            adjustedEvent.index = index;
                            onClickRow(adjustedEvent);
                          }
                        : undefined
                    }
                    onMouseEnter={
                      onClickRow ? () => setActive(index) : undefined
                    }
                    onMouseLeave={
                      onClickRow ? () => setActive(undefined) : undefined
                    }
                    onFocus={onClickRow ? () => setActive(index) : undefined}
                    onBlur={onClickRow ? () => setActive(undefined) : undefined}
                  >
                    {(selected || onSelect) && (
                      <TableCell background={background}>
                        <CheckBox
                          a11yTitle={`${
                            isSelected ? 'unselect' : 'select'
                          } ${primaryValue}`}
                          checked={isSelected}
                          disabled={!onSelect}
                          onChange={() => {
                            if (isSelected) {
                              onSelect(
                                selected.filter(s => s !== primaryValue),
                              );
                            } else onSelect([...selected, primaryValue]);
                          }}
                        />
                      </TableCell>
                    )}

                    {rowDetails && (
                      <ExpanderCell
                        context={isrowExpanded ? 'groupHeader' : 'body'}
                        expanded={isrowExpanded}
                        onToggle={() => {
                          if (isrowExpanded) {
                            setrowExpand(rowExpand.filter(s => s !== index));
                          } else {
                            setrowExpand([...rowExpand, index]);
                          }
                        }}
                      />
                    )}
                    {columns.map(column => (
                      <Cell
                        key={column.property}
                        background={column.pin ? pinnedBackground : background}
                        border={border}
                        context="body"
                        column={column}
                        datum={datum}
                        index={index}
                        pad={pad}
                        primaryProperty={primaryProperty}
                        rowProp={rowProps && rowProps[primaryValue]}
                        scope={
                          column.primary || column.property === primaryProperty
                            ? 'row'
                            : undefined
                        }
                      />
                    ))}
                  </StyledDataTableRow>
                  {rowDetails && isrowExpanded && (
                    <StyledDataTableRow key={`${index.toString()}_expand`}>
                      {(selected || onSelect) && <TableCell />}
                      <TableCell colSpan={columns.length}>
                        {rowDetails(data[index])}
                      </TableCell>
                    </StyledDataTableRow>
                  )}
                </Fragment>
              );
            }}
          </InfiniteScroll>
        </StyledDataTableBody>
      </Keyboard>
    );
  },
);

export { Body };
