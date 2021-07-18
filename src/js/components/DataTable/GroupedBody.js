import React, { forwardRef, useMemo } from 'react';

import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { CheckBox } from '../CheckBox/CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { datumValue, normalizeRowCellProps } from './buildState';

export const GroupedBody = forwardRef(
  (
    {
      cellProps: cellPropsProp,
      columns,
      groupBy,
      groups,
      groupState,
      pinnedOffset,
      primaryProperty,
      onMore,
      onSelect,
      onToggle,
      replace,
      rowProps,
      selected,
      size,
      step,
      ...rest
    },
    ref,
  ) => {    
    const items = useMemo(() => {
      const nextItems = [];
      groups.forEach(group => {
        const { expanded } = groupState[group.key];
        const memberCount = group.data.length;
        if (memberCount > 1) {
          // need a header
          const primaryKeys = [];
          if (group.data.length) {
            group.data.forEach(datum => {
              primaryKeys.push(datum[primaryProperty]);
            });
          }

          const groupSelected =
            primaryKeys && selected
              ? primaryKeys.filter(val => selected.includes(val))
              : [];
          const isGroupSelected =
            groupSelected.length > 0 &&
            group.data.length > 0 &&
            groupSelected.length === group.data.length;
          nextItems.push({
            expanded,
            key: group.key,
            datum: group.datum,
            context: 'groupHeader',
            isSelected: isGroupSelected,
            indeterminate: groupSelected.length > 0 &&
              groupSelected.length < group.data.length,
            onChange: () => {
              if (isGroupSelected) {
                onSelect(
                  selected.filter((s) => !groupSelected.includes(s)),
                );
              } else onSelect([...selected, ...primaryKeys]);
            },
          });
        }
        if (memberCount === 1 || expanded) {
          // add the group members
          group.data.forEach( (datum, index) => {
            const primaryValue = primaryProperty
              ? datumValue(datum, primaryProperty)
              : undefined;
            const isSelected = selected && selected.includes(primaryValue);
            nextItems.push({
              key: datum[primaryProperty],
              primaryValue: primaryProperty
                ? datumValue(datum, primaryProperty)
                : undefined,
              datum,
              context: memberCount > 1 && index === memberCount - 1
                ? 'groupEnd'
                : 'body',
              isSelected,
              onChange: () => {
                if (isSelected) {
                  onSelect(
                    selected.filter((s) => s !== primaryValue),
                  );
                } else onSelect([...selected, primaryValue]);
              },
            });
          });
        }
      });
      return nextItems;
    }, [groups, groupState, primaryProperty, selected, onSelect]);

    return (
      <StyledDataTableBody ref={ref} size={size} {...rest}>
        <InfiniteScroll
          items={items}
          onMore={onMore}
          replace={replace}
          renderMarker={(marker) => (
            <TableRow>
              <TableCell>{marker}</TableCell>
            </TableRow>
          )}
          scrollableAncestor="window"
          step={step}
        >
          { (row, index, rowRef) => {
            const {
              context,
              datum,
              expanded,
              indeterminate,
              isSelected,
              key,
              onChange,
              primaryValue,
            } = row;
            const cellProps = normalizeRowCellProps(
              rowProps,
              cellPropsProp,
              primaryValue,
              index,
            );

            return (
              <StyledDataTableRow
                ref={rowRef}
                key={key}
                size={size}
              >
                <ExpanderCell
                  background={cellProps.background}
                  border={cellProps.border}
                  context={context}
                  pad={cellProps.pad}
                  onToggle={context === 'groupHeader' ?
                    onToggle(key) : undefined}
                  expanded={expanded}
                />
                {(selected || onSelect) && (
                  <TableCell
                    background={cellProps.background}
                    plain="noPad"
                    size="auto"
                  >
                    <CheckBox
                      a11yTitle={`${
                        isSelected ? 'unselect' : 'select'
                      } ${context === 'groupHeader' ? key : primaryValue}`}
                      checked={isSelected}
                      indeterminate={indeterminate}
                      disabled={!onSelect}
                      onChange={onChange}
                      pad={cellProps.pad}
                    />
                  </TableCell>
                )}
                {columns.map((column) => {
                  let scope;
                  if (context === 'groupHeader') {
                    scope = column.property === groupBy ? 'row' : undefined;
                  }
                  else {
                    scope = column.primary ? 'row' : undefined;
                  }
                  return (
                    <Cell
                      key={column.property}
                      background={cellProps.background}
                      border={cellProps.border}
                      context={context}
                      column={column}
                      datum={datum}
                      pad={cellProps.pad}
                      scope={scope}
                      pinnedOffset={context === 'groupHeader' && pinnedOffset &&
                        pinnedOffset[column.property]}
                    />
                  );
                })}
              </StyledDataTableRow>
            );
          }}
        </InfiniteScroll>
      </StyledDataTableBody>
    );
  },
);
