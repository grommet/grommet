import React, { forwardRef, memo, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { ExpanderCell } from './ExpanderCell';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { datumValue } from './buildState';

const Row = memo(
  ({
    primaryValue,
    index,
    rowRef,
    size,
    active,
    lastActive,
    itemFocus,
    onClickRow,
    datum,
    setActive,
    setLastActive,
    setItemFocus,
    selected,
    onSelect,
    background,
    isSelected,
    rowDetails,
    isRowExpanded,
    setRowExpand,
    rowExpand,
    columns,
    pinnedBackground,
    pinnedOffset,
    border,
    pad,
    primaryProperty,
    rowProps,
    data,
    theme,
  }) => (
    <>
      <StyledDataTableRow
        ref={rowRef}
        size={size}
        itemFocus={itemFocus}
        tabIndex={onClickRow ? 0 : undefined}
        active={active}
        lastActive={lastActive}
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
          onClickRow
            ? () => {
                setLastActive(undefined);
                setActive(index);
              }
            : undefined
        }
        onMouseLeave={onClickRow ? () => setActive(lastActive) : undefined}
        onFocus={
          onClickRow
            ? () => {
                setActive(index);
                setItemFocus(true);
              }
            : undefined
        }
        onBlur={
          onClickRow
            ? () => {
                setLastActive(active);
                setActive(undefined);
                setItemFocus(false);
              }
            : undefined
        }
      >
        {(selected || onSelect) && (
          <TableCell background={background} plain="noPad" size="auto">
            <CheckBox
              a11yTitle={`${
                isSelected ? 'unselect' : 'select'
              } ${primaryValue}`}
              checked={isSelected}
              disabled={!onSelect}
              onChange={() => {
                if (isSelected) {
                  onSelect(selected.filter(s => s !== primaryValue));
                } else onSelect([...selected, primaryValue]);
              }}
              pad={
                (rowProps &&
                  rowProps[primaryValue] &&
                  rowProps[primaryValue].pad) ||
                pad ||
                theme.table.body.pad
              }
            />
          </TableCell>
        )}

        {rowDetails && (
          <ExpanderCell
            context={isRowExpanded ? 'groupHeader' : 'body'}
            expanded={isRowExpanded}
            onToggle={() => {
              if (isRowExpanded) {
                setRowExpand(rowExpand.filter(s => s !== index));
              } else {
                setRowExpand([...rowExpand, index]);
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
            pinnedOffset={pinnedOffset && pinnedOffset[column.property]}
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
      {rowDetails && isRowExpanded && (
        <StyledDataTableRow key={`${index.toString()}_expand`}>
          {(selected || onSelect) && <TableCell />}
          <TableCell colSpan={columns.length + 1}>
            {rowDetails(data[index])}
          </TableCell>
        </StyledDataTableRow>
      )}
    </>
  ),
);

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
      pinnedOffset,
      primaryProperty,
      rowProps,
      selected,
      rowDetails,
      show,
      size,
      step,
      rowExpand,
      setRowExpand,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [active, setActive] = React.useState();
    const [lastActive, setLastActive] = React.useState();
    const [itemFocus, setItemFocus] = React.useState();

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
            show={show}
            step={step}
          >
            {(datum, index, rowRef) => {
              const primaryValue = primaryProperty
                ? datumValue(datum, primaryProperty)
                : undefined;
              const isSelected = selected && selected.includes(primaryValue);
              const isRowExpanded = rowExpand && rowExpand.includes(index);
              return (
                <Row
                  key={index}
                  rowRef={rowRef}
                  primaryValue={primaryValue}
                  isSelected={isSelected}
                  isRowExpanded={isRowExpanded}
                  index={index}
                  size={size}
                  active={active >= 0 ? active === index : undefined}
                  lastActive={lastActive}
                  itemFocus={itemFocus}
                  onClickRow={onClickRow}
                  datum={datum}
                  setActive={setActive}
                  setLastActive={setLastActive}
                  setItemFocus={setItemFocus}
                  selected={selected}
                  onSelect={onSelect}
                  background={background}
                  rowDetails={rowDetails}
                  setRowExpand={setRowExpand}
                  rowExpand={rowExpand}
                  columns={columns}
                  pinnedBackground={pinnedBackground}
                  border={border}
                  pad={pad}
                  primaryProperty={primaryProperty}
                  rowProps={rowProps}
                  data={data}
                  theme={theme}
                  pinnedOffset={pinnedOffset}
                />
              );
            }}
          </InfiniteScroll>
        </StyledDataTableBody>
      </Keyboard>
    );
  },
);

export { Body };
