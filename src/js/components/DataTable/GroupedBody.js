import React, { Fragment } from 'react';

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
  ...rest
}) => (
  <StyledDataTableBody size={size} {...rest}>
    {groups.map(group => {
      const { expanded } = groupState[group.key];
      const memberCount = group.data.length;

      let content =
        memberCount > 1 ? (
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
              />
            ))}
          </StyledDataTableRow>
        ) : null;

      if (memberCount === 1 || expanded) {
        content = (
          <Fragment key={group.key}>
            {content}
            {group.data.map((datum, index) => {
              const context =
                memberCount > 1 && index === memberCount - 1
                  ? 'groupEnd'
                  : 'body';
              return (
                <StyledDataTableRow key={datum[primaryProperty]} size={size}>
                  <ExpanderCell context={context} />
                  {columns.map(column => (
                    <Cell
                      key={column.property}
                      context={context}
                      column={column}
                      datum={datum}
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
