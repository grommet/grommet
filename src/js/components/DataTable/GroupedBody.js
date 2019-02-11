import React, { Fragment } from 'react';

import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

export const GroupedBody = ({
  columns,
  groupBy,
  groups,
  groupState,
  primaryProperty,
  onToggle,
  size,
  theme,
  checked,
  selectable,
  onRowClick,
  onClick,
  ...rest
}) => (
  <StyledDataTableBody size={size} {...rest}>
    {groups.map(group => {
      const { expanded } = groupState[group.key];
      const groupPrimaryProperties = group.data.map(
        datum => datum[primaryProperty],
      );

      let content = (
        <StyledDataTableRow key={group.key} size={size}>
          <ExpanderCell
            context={expanded ? 'groupHeader' : 'body'}
            expanded={expanded}
            onToggle={onToggle(group.key)}
          />
          {columns.map(column => (
            <Cell
              key={column.property}
              context={expanded ? 'groupHeader' : 'body'}
              column={column}
              datum={group.datum}
              scope={column.property === groupBy ? 'row' : undefined}
              isChecked={groupPrimaryProperties.every(item =>
                checked.includes(item),
              )}
              isIndeterminate={groupPrimaryProperties.some(item =>
                checked.includes(item),
              )}
              onClick={event => onClick(event, group.data)}
            />
          ))}
        </StyledDataTableRow>
      );

      if (expanded) {
        content = (
          <Fragment key={group.key}>
            {content}
            {group.data.map(datum => (
              <StyledDataTableRow
                onClick={event => onClick(event, datum)}
                hoverIndicator={selectable || onRowClick !== undefined}
                key={datum[primaryProperty]}
                size={size}
              >
                <TableCell verticalAlign="bottom">
                  {groupState[group.key].expanded}
                </TableCell>
                {columns.map(column => (
                  <Cell
                    key={column.property}
                    context="body"
                    column={column}
                    datum={datum}
                    scope={column.primary ? 'row' : undefined}
                    isChecked={checked.indexOf(datum[primaryProperty]) !== -1}
                    onClick={event => onClick(event, datum)}
                  />
                ))}
              </StyledDataTableRow>
            ))}
            <StyledDataTableRow size={size} aria-hidden>
              <TableCell />
            </StyledDataTableRow>
          </Fragment>
        );
      }

      return content;
    })}
  </StyledDataTableBody>
);
