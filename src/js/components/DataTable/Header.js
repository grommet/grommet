import React from 'react';
import { FormSearch } from 'grommet-icons';

import { TableRow, TableHeader, TableCell } from '../Table';
import { Text } from '../Text';
import { Box } from '../Box';
import { TextInput } from '../TextInput';

import Resizer from './Resizer';
import Sorter from './Sorter';
import ExpanderCell from './ExpanderCell';

const Header = ({
  columns, filters, groups, groupState, headerProps,
  onFilter, onResize, onSort, onToggle,
  sort, widths,
}) => (
  <TableHeader>
    <TableRow>

      {groups ? (
        <ExpanderCell
          {...headerProps}
          verticalAlign='bottom'
          expanded={Object.keys(groupState)
            .filter(k => !groupState[k].expanded).length === 0}
          onToggle={onToggle}
        />
      ) : null}

      {columns.map(({ property, label, align }) => (
        <TableCell
          key={property}
          scope='col'
          plain={true}
          style={widths && widths[property] ?
            { width: widths[property] } : undefined}
        >
          <Resizer property={property} onResize={onResize}>
            <Box
              flex={true}
              {...headerProps}
              direction='row'
              justify={align}
            >
              <Sorter
                align={align}
                property={property}
                onSort={onSort}
                sort={sort}
              >
                <Text>{label}</Text>
              </Sorter>
            </Box>
          </Resizer>
        </TableCell>
      ))}

    </TableRow>

    {filters ? (
      <TableRow>
        {groups ? (
          <TableCell size='xxsmall' {...headerProps} />
        ) : null}
        {columns.map(({ property, search }) => (
          <TableCell key={property} plain={true}>
            <Box {...headerProps}>
              {search ? (
                <TextInput
                  plain={true}
                  placeholder={<FormSearch color='border' />}
                  value={filters[property]}
                  onChange={event => onFilter(property, event.target.value)}
                />
              ) : null}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    ) : null}

  </TableHeader>
);

export default Header;
