import React, { Fragment } from 'react';

import { TableRow, TableBody, TableCell } from '../Table';

import CellContent from './CellContent';
import ExpanderCell from './ExpanderCell';

const GroupedBody = ({
  bodyProps, columns, groupBy, groups, groupState, primaryProperty, onToggle,
}) => {
  let priorExpanded = false;
  return (
    <TableBody>
      {groups.map((group) => {
        const expanded = groupState[group.key].expanded;

        const border = expanded && !priorExpanded ? 'top' : undefined;
        let content = (
          <TableRow key={group.key}>
            <ExpanderCell
              border={border}
              expanded={expanded}
              {...bodyProps}
              onToggle={onToggle(group.key)}
            />
            {columns.map(({ property, render, align }) => (
              <TableCell
                key={property}
                scope={property === groupBy ? 'row' : undefined}
                align={align}
                border={border}
                verticalAlign='top'
                {...bodyProps}
              >
                {group.datum[property] ? (
                  <CellContent
                    datum={group.datum}
                    property={property}
                    render={render}
                    primary={property === groupBy}
                  />
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        );

        if (expanded) {
          content = (
            <Fragment key={group.key}>
              {content}
              {group.data.map((datum, index) => {
                const last = index === (group.data.length - 1);
                const border2 = last ? 'bottom' : undefined;
                return (
                  <TableRow key={datum[primaryProperty]}>
                    <TableCell
                      verticalAlign='bottom'
                      border={border2}
                    >
                      {groupState[group.key].expanded}
                    </TableCell>
                    {columns.map(({ property, primary, render, align }) => (
                      <TableCell
                        key={property}
                        scope={primary ? 'row' : undefined}
                        align={align}
                        verticalAlign='bottom'
                        border={border2}
                        {...bodyProps}
                      >
                        <CellContent
                          datum={datum}
                          property={property}
                          render={render}
                          primary={primary}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </Fragment>
          );
        }
        priorExpanded = expanded;

        return content;
      })}
    </TableBody>
  );
};

export default GroupedBody;
