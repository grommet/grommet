/* eslint-disable no-underscore-dangle */
import React, { forwardRef, memo, useEffect } from 'react';

import { useForwardedRef } from '../../utils';
import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { ExpanderCell } from './ExpanderCell';

import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { datumValue, normalizeRowCellProps } from './buildState';
import { useThemeValue } from '../../utils/useThemeValue';

const Row = memo(
  ({
    expandLabel,
    cellProps,
    primaryValue,
    index,
    rowRef,
    size,
    active,
    focused,
    lastFocused,
    onClickRow,
    datum,
    selected,
    onSelect,
    passThemeFlag,
    isDisabled,
    isSelected,
    rowDetails,
    isRowExpanded,
    setActive,
    setFocused,
    setRowExpand,
    rowExpand,
    columns,
    pinnedOffset,
    primaryProperty,
    verticalAlign,
    onRowRefChange,
  }) => (
    <>
      <StyledDataTableRow
        ref={(element) => {
          // Store the row element in the parent's ref map
          if (onRowRefChange) {
            onRowRefChange(index, element);
          }
          // Also call the original rowRef if it exists
          if (rowRef) {
            if (typeof rowRef === 'function') {
              rowRef(element);
            } else if (
              rowRef &&
              typeof rowRef === 'object' &&
              'current' in rowRef
            ) {
              const refObj = rowRef;
              refObj.current = element;
            }
          }
        }}
        size={size}
        active={active}
        aria-disabled={(onClickRow && isDisabled) || undefined}
        onClick={
          onClickRow
            ? (event) => {
                if (onClickRow && !isDisabled) {
                  setFocused(index);
                  setActive(index);
                  if (typeof onClickRow === 'function') {
                    // extract from React's synthetic event pool
                    event.persist();
                    const adjustedEvent = event;
                    adjustedEvent.datum = datum;
                    adjustedEvent.index = index;
                    onClickRow(adjustedEvent);
                  } else if (onClickRow === 'select') {
                    if (isSelected) {
                      onSelect(
                        selected.filter((s) => s !== primaryValue),
                        datum,
                      );
                    } else onSelect([...selected, primaryValue], datum);
                  }
                }
              }
            : undefined
        }
        onFocus={() => {
          if (onClickRow && !isDisabled) {
            setFocused(index);
            setActive(index);
          }
        }}
        onMouseOver={
          onClickRow && !isDisabled ? () => setActive(index) : undefined
        }
        tabIndex={
          // eslint-disable-next-line no-nested-ternary
          !onClickRow
            ? undefined
            : // If this row is focused, it should be focusable
            // If no row is focused and this is the first row, make it focusable
            (focused !== undefined && focused === index) ||
              (focused === undefined && lastFocused === index) ||
              (focused === undefined && index === 0)
            ? 0
            : // Otherwise, not in tab order
              -1
        }
        {...passThemeFlag}
      >
        {(selected || onSelect) && (
          <Cell
            background={
              (isSelected && cellProps.selected.background) ||
              (pinnedOffset?._grommetDataTableSelect &&
                cellProps.pinned.background) ||
              cellProps.background
            }
            border={cellProps.pinned.border || cellProps.border}
            pinnedOffset={pinnedOffset?._grommetDataTableSelect}
            aria-disabled={isDisabled || !onSelect || undefined}
            column={{
              pin: Boolean(pinnedOffset?._grommetDataTableSelect),
              plain: 'noPad',
              size: 'auto',
              render: () => (
                <CheckBox
                  tabIndex={onClickRow === 'select' ? -1 : undefined}
                  a11yTitle={`${
                    isSelected ? 'unselect' : 'select'
                  } ${primaryValue}`}
                  checked={isSelected}
                  disabled={isDisabled || !onSelect}
                  onChange={() => {
                    if (isSelected) {
                      onSelect(
                        selected.filter((s) => s !== primaryValue),
                        datum,
                      );
                    } else onSelect([...selected, primaryValue], datum);
                  }}
                  pad={cellProps.pad}
                />
              ),
            }}
            verticalAlign={verticalAlign}
          />
        )}
        {rowDetails && (
          <ExpanderCell
            background={isSelected && cellProps.selected.background}
            context={isRowExpanded ? 'groupHeader' : 'body'}
            expanded={isRowExpanded}
            expandLabel={expandLabel}
            onToggle={() => {
              let nextRowExpand;
              const rowKey = primaryValue || index;
              if (isRowExpanded) {
                nextRowExpand = rowExpand.filter((s) => s !== rowKey);
              } else {
                nextRowExpand = [...rowExpand, rowKey];
              }
              if (rowDetails.onExpand) {
                rowDetails.onExpand(nextRowExpand, datum);
              } else {
                setRowExpand(nextRowExpand);
              }
            }}
            pad={cellProps.pad}
            verticalAlign={verticalAlign}
          />
        )}
        {columns.map((column) => (
          <Cell
            key={column.property}
            background={
              (isSelected && cellProps.selected.background) ||
              (column.pin && cellProps.pinned.background) ||
              cellProps.background
            }
            border={(column.pin && cellProps.pinned.border) || cellProps.border}
            context="body"
            column={column}
            datum={datum}
            isSelected={isSelected}
            pad={(column.pin && cellProps.pinned.pad) || cellProps.pad}
            pinnedOffset={pinnedOffset && pinnedOffset[column.property]}
            primaryProperty={primaryProperty}
            scope={
              column.primary || column.property === primaryProperty
                ? 'row'
                : undefined
            }
            verticalAlign={verticalAlign}
          />
        ))}
      </StyledDataTableRow>
      {rowDetails && isRowExpanded && (
        <StyledDataTableRow key={`${index.toString()}_expand`}>
          {(selected || onSelect) && <TableCell />}
          <TableCell colSpan={columns.length + 1}>
            {rowDetails.render ? rowDetails.render(datum) : rowDetails(datum)}
          </TableCell>
        </StyledDataTableRow>
      )}
    </>
  ),
);

const Body = forwardRef(
  (
    {
      cellProps: cellPropsProp,
      columns,
      data,
      disabled,
      onMore,
      replace,
      onClickRow,
      onSelect,
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
      verticalAlign,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const [focused, setFocused] = React.useState();
    const [lastFocused, setLastFocused] = React.useState();
    const [active, setActive] = React.useState();
    const [scroll, setScroll] = React.useState();
    const containerRef = useForwardedRef(ref);

    // Store refs for each row to enable direct focus management
    const rowRefs = React.useRef(new Map());
    // Callback to store row references
    const handleRowRefChange = React.useCallback((index, element) => {
      if (element) {
        rowRefs.current.set(index, element);
      } else {
        rowRefs.current.delete(index);
      }
    }, []);

    const activePrimaryValue =
      active >= 0 ? datumValue(data[active], primaryProperty) : undefined;

    const selectRow = () => {
      if (activePrimaryValue !== undefined) {
        if (selected && selected.includes(activePrimaryValue)) {
          onSelect(selected.filter((s) => s !== activePrimaryValue));
        } else onSelect([...selected, activePrimaryValue]);
      }
    };

    const clickableRow =
      onClickRow &&
      active >= 0 &&
      (!disabled ||
        (activePrimaryValue !== undefined &&
          !disabled.includes(activePrimaryValue)));

    // Determine if the DataTable body is scrollable
    useEffect(() => {
      if (containerRef.current) {
        const element = containerRef.current;
        if (element.scrollHeight > element.offsetHeight) {
          setScroll(true);
        }
      }
    }, [containerRef]);

    // roving tab index, ensure row (when onClickRow) has DOM focus
    useEffect(() => {
      if (focused !== undefined && rowRefs.current.has(focused)) {
        const focusedRowElement = rowRefs.current.get(focused);
        if (focusedRowElement && focusedRowElement.focus) {
          focusedRowElement.focus();
        }
      }
    }, [focused]);

    return (
      <Keyboard
        onEnter={
          clickableRow
            ? (event) => {
                if (clickableRow) {
                  if (typeof onClickRow === 'function') {
                    event.persist();
                    const adjustedEvent = event;
                    adjustedEvent.datum = data[focused];
                    onClickRow(adjustedEvent);
                  } else if (onClickRow === 'select') {
                    selectRow();
                  }
                }
              }
            : undefined
        }
        // The WCAG recommendation for checkboxes is to select them with "Space"
        onSpace={
          clickableRow
            ? (event) => {
                event.preventDefault();

                if (typeof onClickRow === 'function') {
                  event.persist();
                  const adjustedEvent = event;
                  adjustedEvent.datum = data?.[focused];
                  onClickRow(adjustedEvent);
                } else if (onClickRow === 'select') {
                  selectRow();
                }
              }
            : undefined
        }
        onUp={
          onClickRow && focused
            ? () => {
                const previousIndex = focused - 1;
                setFocused(previousIndex);
                setActive(previousIndex);
              }
            : undefined
        }
        onDown={
          onClickRow && data.length && focused < data.length - 1
            ? (event) => {
                event.preventDefault();
                const nextIndex = (focused ?? -1) + 1;
                setFocused(nextIndex);
                setActive(nextIndex);
              }
            : undefined
        }
      >
        <StyledDataTableBody
          ref={containerRef}
          size={size}
          tabIndex={!onClickRow && scroll ? 0 : undefined}
          onMouseOut={() => setActive(undefined)}
          onBlur={(event) => {
            // only reset focused if the focus is leaving the table
            // and not moving to a child element of the table
            if (
              containerRef.current &&
              !containerRef.current.contains(event.relatedTarget)
            ) {
              setLastFocused(focused);
              setFocused(undefined);
              setActive(undefined);
            }
          }}
          {...passThemeFlag}
          {...rest}
        >
          <InfiniteScroll
            items={data}
            onMore={onMore}
            replace={replace}
            renderMarker={(marker) => (
              <TableRow>
                <TableCell>{marker}</TableCell>
              </TableRow>
            )}
            show={show}
            step={step}
          >
            {(datum, index, rowRef) => {
              const primaryValue = primaryProperty
                ? datumValue(datum, primaryProperty)
                : undefined;
              const isSelected = selected && selected.includes(primaryValue);
              const isDisabled = disabled && disabled.includes(primaryValue);
              const isRowExpanded =
                rowExpand && rowExpand.includes(primaryValue || index);
              const cellProps = normalizeRowCellProps(
                rowProps,
                cellPropsProp,
                primaryValue,
                index,
              );
              let expandLabel;
              if (
                typeof rowDetails === 'object' &&
                typeof rowDetails.expandLabel === 'function'
              ) {
                expandLabel = rowDetails.expandLabel(datum);
              }
              return (
                <Row
                  expandLabel={expandLabel}
                  key={primaryValue ?? index}
                  setActive={setActive}
                  rowRef={rowRef}
                  cellProps={cellProps}
                  primaryValue={primaryValue}
                  isDisabled={isDisabled}
                  isSelected={isSelected}
                  isRowExpanded={isRowExpanded}
                  index={index}
                  size={size}
                  active={active >= 0 ? active === index : undefined}
                  focused={focused}
                  lastFocused={lastFocused}
                  setFocused={setFocused}
                  onRowRefChange={handleRowRefChange}
                  onClickRow={onClickRow}
                  passThemeFlag={passThemeFlag}
                  datum={datum}
                  selected={selected}
                  onSelect={onSelect}
                  rowDetails={rowDetails}
                  setRowExpand={setRowExpand}
                  rowExpand={rowExpand}
                  columns={columns}
                  primaryProperty={primaryProperty}
                  rowProps={rowProps}
                  data={data}
                  theme={theme}
                  pinnedOffset={pinnedOffset}
                  verticalAlign={verticalAlign}
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
