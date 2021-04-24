import React, { forwardRef, Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { CheckBox } from '../CheckBox/CheckBox';
import { TableCell } from '../TableCell';
import { datumValue } from './buildState';

export const GroupedBody = forwardRef(
  (
    {
      background,
      border,
      columns,
      groupBy,
      groups,
      groupState,
      pad,
      primaryProperty,
      onSelect,
      onToggle,
      selected,
      size,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
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

          let content =
            memberCount > 1 ? (
              <StyledDataTableRow key={group.key} size={size}>
                <ExpanderCell
                  context={expanded ? 'groupHeader' : 'body'}
                  expanded={expanded}
                  onToggle={onToggle(group.key)}
                />
                {(selected || onSelect) && (
                  <TableCell background={background} plain="noPad" size="auto">
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
                      pad={pad || theme.table.body.pad}
                    />
                  </TableCell>
                )}
                {columns.map(column => (
                  <Cell
                    key={column.property}
                    background={background}
                    border={border}
                    context={expanded ? 'groupHeader' : 'body'}
                    column={column}
                    datum={group.datum}
                    pad={pad}
                    scope={column.property === groupBy ? 'row' : undefined}
                  />
                ))}
              </StyledDataTableRow>
            ) : null;

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
                  return (
                    <StyledDataTableRow
                      key={datum[primaryProperty]}
                      size={size}
                    >
                      <ExpanderCell context={context} />
                      {(selected || onSelect) && (
                        <TableCell
                          background={background}
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
                            pad={pad || theme.table.body.pad}
                          />
                        </TableCell>
                      )}
                      {columns.map(column => (
                        <Cell
                          key={column.property}
                          background={background}
                          border={border}
                          context={context}
                          column={column}
                          datum={datum}
                          pad={pad}
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
