import React, { forwardRef, Fragment } from 'react';

import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { CheckBox } from '../CheckBox/CheckBox';
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
      onSelect,
      onToggle,
      rowProps,
      selected,
      size,
      ...rest
    },
    ref,
  ) => {
    let rowIndex = 0;
    return (
      <StyledDataTableBody ref={ref} size={size} {...rest}>
        {groups.map(group => {
          const { expanded } = groupState[group.key];
          const memberCount = group.data.length;

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
          let cellProps = normalizeRowCellProps(
            rowProps,
            cellPropsProp,
            rowIndex,
          );

          let content =
            memberCount > 1 ? (
              <StyledDataTableRow key={group.key} size={size}>
                <ExpanderCell
                  background={cellProps.background}
                  border={cellProps.border}
                  context={expanded ? 'groupHeader' : 'body'}
                  expanded={expanded}
                  index={rowIndex}
                  onToggle={onToggle(group.key)}
                />
                {(selected || onSelect) && (
                  <TableCell
                    background={cellProps.background}
                    plain="noPad"
                    size="auto"
                  >
                    <CheckBox
                      a11yTitle={`${isGroupSelected ? 'unselect' : 'select'} ${
                        group.key
                      }`}
                      checked={isGroupSelected}
                      indeterminate={
                        groupSelected.length > 0 &&
                        groupSelected.length < group.data.length
                      }
                      disabled={!onSelect}
                      onChange={() => {
                        if (isGroupSelected) {
                          onSelect(
                            selected.filter(s => !groupSelected.includes(s)),
                          );
                        } else {
                          onSelect([...selected, ...primaryKeys]);
                        }
                      }}
                      pad={cellProps.pad}
                    />
                  </TableCell>
                )}
                {columns.map(column => (
                  <Cell
                    key={column.property}
                    background={cellProps.background}
                    border={cellProps.border}
                    context={expanded ? 'groupHeader' : 'body'}
                    column={column}
                    datum={group.datum}
                    index={rowIndex}
                    pad={cellProps.pad}
                    pinnedOffset={pinnedOffset && pinnedOffset[column.property]}
                    scope={column.property === groupBy ? 'row' : undefined}
                  />
                ))}
              </StyledDataTableRow>
            ) : null;
          if (memberCount > 1) rowIndex += 1;

          if (memberCount === 1 || expanded) {
            content = (
              <Fragment key={group.key}>
                {content}
                {group.data.map((datum, index) => {
                  const primaryValue = primaryProperty
                    ? datumValue(datum, primaryProperty)
                    : undefined;
                  const isSelected =
                    selected && selected.includes(primaryValue);
                  const context =
                    memberCount > 1 && index === memberCount - 1
                      ? 'groupEnd'
                      : 'body';
                  cellProps = normalizeRowCellProps(
                    rowProps,
                    cellPropsProp,
                    rowIndex,
                  );
                  rowIndex += 1;
                  return (
                    <StyledDataTableRow
                      key={datum[primaryProperty]}
                      size={size}
                    >
                      <ExpanderCell
                        background={cellProps.background}
                        border={cellProps.border}
                        context={context}
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
                            pad={cellProps.pad}
                          />
                        </TableCell>
                      )}
                      {columns.map(column => (
                        <Cell
                          key={column.property}
                          background={cellProps.background}
                          border={cellProps.border}
                          context={context}
                          column={column}
                          datum={datum}
                          pad={cellProps.pad}
                          scope={column.primary ? 'row' : undefined}
                        />
                      ))}
                    </StyledDataTableRow>
                  );
                })}
              </Fragment>
            );
          }

          return content;
        })}
      </StyledDataTableBody>
    );
  },
);
