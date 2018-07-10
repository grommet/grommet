import React from 'react';

import { TableCell } from '../Table';
import { Text } from '../Text';
import { Box } from '../Box';

import Resizer from './Resizer';
import Searcher from './Searcher';
import Sorter from './Sorter';
import ExpanderCell from './ExpanderCell';
import { StyledDataTableHeader, StyledDataTableRow } from './StyledDataTable';

const Header = ({
  columns, filtering, filters, groups, groupState,
  onFilter, onFiltering, onResize, onSort, onToggle,
  sort, theme, widths, ...rest
}) => (
  <StyledDataTableHeader {...rest}>
    <StyledDataTableRow>

      {groups ? (
        <ExpanderCell
          context='header'
          expanded={Object.keys(groupState)
            .filter(k => !groupState[k].expanded).length === 0}
          theme={theme}
          onToggle={onToggle}
        />
      ) : null}

      {columns.map(({ property, header, align, search }) => (
        <TableCell
          key={property}
          scope='col'
          plain={true}
          verticalAlign='bottom'
          style={widths && widths[property] ?
            { width: widths[property] } : undefined}
        >
          <Resizer property={property} onResize={onResize} theme={theme}>
            <Box flex={true}>
              <Box
                flex={true}
                direction='row'
                justify='between'
                align='center'
                {...theme.dataTable.header}
                pad={undefined}
              >
                <Sorter
                  align={align}
                  property={property}
                  onSort={onSort}
                  sort={sort}
                  theme={theme}
                >
                  {typeof header === 'string' ? (
                    <Text>{header}</Text>
                  ) : header}
                </Sorter>
                {filters && search ? (
                  <Searcher
                    filtering={filtering}
                    filters={filters}
                    property={property}
                    onFilter={onFilter}
                    onFiltering={onFiltering}
                  />
                ) : null}
              </Box>
            </Box>
          </Resizer>
        </TableCell>
      ))}

    </StyledDataTableRow>
  </StyledDataTableHeader>
);

export default Header;
