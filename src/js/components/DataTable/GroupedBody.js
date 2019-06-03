import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';

import { TableCell } from '../TableCell';
import { Box } from '../Box';

import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

const GroupedBody = ({
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
                  <TableCell size="xxsmall" plain verticalAlign="bottom">
                    <Box
                      {...theme.table[context]}
                      {...theme.dataTable[context]}
                    >
                      {groupState[group.key].expanded}
                    </Box>
                  </TableCell>
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

GroupedBody.defaultProps = {};
Object.setPrototypeOf(GroupedBody.defaultProps, defaultProps);

const GroupedBodyWrapper = compose(withTheme)(GroupedBody);

export { GroupedBodyWrapper as GroupedBody };
