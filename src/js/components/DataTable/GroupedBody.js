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
  ...rest
}) => (
  <StyledDataTableBody size={size} theme={theme} {...rest}>
    {groups.map(group => {
      const { expanded } = groupState[group.key];

      let content = (
        <StyledDataTableRow key={group.key} size={size}>
          <ExpanderCell
            context={expanded ? 'groupHeader' : 'body'}
            expanded={expanded}
            theme={theme}
            onToggle={onToggle(group.key)}
          />
          {columns.map(column => (
            <Cell
              key={column.property}
              context={expanded ? 'groupHeader' : 'body'}
              column={column}
              datum={group.datum}
              scope={column.property === groupBy ? 'row' : undefined}
              theme={theme}
            />
          ))}
        </StyledDataTableRow>
      );

      if (expanded) {
        content = (
          <Fragment key={group.key}>
            {content}
            {group.data.map(datum => (
              <StyledDataTableRow key={datum[primaryProperty]} size={size}>
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
                    theme={theme}
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
