import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { TableCell } from '../TableCell';
import { Text } from '../Text';

import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { Sorter } from './Sorter';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableHeader, StyledDataTableRow } from './StyledDataTable';

const Header = ({
  columns,
  filtering,
  filters,
  groups,
  groupState,
  onFilter,
  onFiltering,
  onResize,
  onSort,
  onToggle,
  sort,
  theme,
  widths,
  ...rest
}) => {
  const dataTableContextTheme = {
    ...theme.table.header,
    ...theme.dataTable.header,
  };
  // The tricky part here is that we need to manage the theme styling
  // to make sure that the background, border, and padding are applied
  // at the right places depending on the mix of controls in each header cell.
  const outerThemeProps = (({ border, background }) => ({
    border,
    background,
  }))(dataTableContextTheme);
  const { border, background, ...innerThemeProps } = dataTableContextTheme;
  return (
    <StyledDataTableHeader {...rest}>
      <StyledDataTableRow>
        {groups && (
          <ExpanderCell
            context="header"
            expanded={
              Object.keys(groupState).filter(k => !groupState[k].expanded)
                .length === 0
            }
            onToggle={onToggle}
          />
        )}

        {columns.map(
          ({ property, header, align, search, selection, sortable }) => {
            let content;
            if (selection) {
              content = <CheckBox />;
            } else if (typeof header === 'string') {
              content = <Text>{header}</Text>;
            } else {
              content = header;
            }
            if (onSort && sortable !== false) {
              content = (
                <Sorter
                  align={align}
                  fill={!search}
                  property={property}
                  onSort={onSort}
                  sort={sort}
                  themeProps={search ? innerThemeProps : dataTableContextTheme}
                >
                  {content}
                </Sorter>
              );
            }

            if (search && filters) {
              if (!onSort) {
                content = (
                  <Box justify="center" align={align} {...innerThemeProps}>
                    {content}
                  </Box>
                );
              }
              content = (
                <Box
                  fill
                  direction="row"
                  justify="between"
                  align="center"
                  {...outerThemeProps}
                >
                  {content}
                  <Searcher
                    filtering={filtering}
                    filters={filters}
                    property={property}
                    onFilter={onFilter}
                    onFiltering={onFiltering}
                  />
                </Box>
              );
            } else if (!onSort || sortable === false) {
              content = (
                <Box
                  {...dataTableContextTheme}
                  fill
                  justify="center"
                  align={align}
                >
                  {content}
                </Box>
              );
            }

            if (onResize) {
              content = (
                <Resizer property={property} onResize={onResize}>
                  {content}
                </Resizer>
              );
            }

            return (
              <TableCell
                key={property || selection}
                scope="col"
                plain
                style={
                  widths && widths[property]
                    ? { width: widths[property] }
                    : undefined
                }
              >
                {content}
              </TableCell>
            );
          },
        )}
      </StyledDataTableRow>
    </StyledDataTableHeader>
  );
};

Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);

const HeaderWrapper = compose(withTheme)(Header);

export { HeaderWrapper as Header };
