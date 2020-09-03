import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { TableCell } from '../TableCell';
import { Text } from '../Text';

import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { ExpanderCell } from './ExpanderCell';
import {
  StyledDataTableCell,
  StyledDataTableHeader,
  StyledDataTableRow,
} from './StyledDataTable';
import { datumValue } from './buildState';

const Header = ({
  background,
  border,
  columns,
  data,
  fill,
  filtering,
  filters,
  groups,
  groupState,
  onFilter,
  onFiltering,
  onResize,
  onSelect,
  onSort,
  onToggle,
  pad,
  pin: tablePin,
  primaryProperty,
  selected,
  sort,
  widths,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return (
    <StyledDataTableHeader fillProp={fill} {...rest}>
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

        {(selected || onSelect) && (
          <TableCell>
            <CheckBox
              checked={selected.length === data.length}
              indeterminate={
                selected.length > 0 && selected.length < data.length
              }
              onChange={() => {
                // if any are selected, clear selection
                if (selected.length > 0) onSelect([]);
                // if none are selected, select all data
                else
                  onSelect(
                    data.map(datum => datumValue(datum, primaryProperty)),
                  );
              }}
            />
          </TableCell>
        )}

        {columns.map(
          ({
            property,
            header,
            align,
            pin: columnPin,
            search,
            sortable,
            verticalAlign,
            size,
          }) => {
            let content =
              typeof header === 'string' ? <Text>{header}</Text> : header;

            if (onSort && sortable !== false) {
              let Icon;
              if (onSort && sortable !== false) {
                if (sort && sort.property === property) {
                  Icon =
                    theme.dataTable.icons[
                      sort.direction !== 'asc' ? 'ascending' : 'descending'
                    ];
                } else if (theme.dataTable.icons.sortable) {
                  Icon = theme.dataTable.icons.sortable;
                }
              }
              content = (
                <Button plain fill="vertical" onClick={onSort(property)}>
                  <Box direction="row" align="center" gap="xsmall">
                    {content}
                    {Icon && <Icon />}
                  </Box>
                </Button>
              );
            }

            if (search || onResize) {
              const resizer = onResize ? (
                <Resizer property={property} onResize={onResize} />
              ) : null;
              const searcher =
                search && filters ? (
                  <Searcher
                    filtering={filtering}
                    filters={filters}
                    property={property}
                    onFilter={onFilter}
                    onFiltering={onFiltering}
                  />
                ) : null;
              content = (
                <Box
                  direction="row"
                  align="center"
                  justify={!align || align === 'start' ? 'between' : align}
                  gap="small"
                  fill="vertical"
                  style={onResize ? { position: 'relative' } : undefined}
                >
                  {content}
                  {searcher && resizer ? (
                    <Box
                      flex="shrink"
                      direction="row"
                      align="center"
                      gap="small"
                    >
                      {searcher}
                      {resizer}
                    </Box>
                  ) : (
                    searcher || resizer
                  )}
                </Box>
              );
            }
            const pin = [];
            if (tablePin) pin.push('top');
            if (columnPin) pin.push('left');
            return (
              <StyledDataTableCell
                key={property}
                align={align}
                verticalAlign={verticalAlign}
                background={background}
                border={border}
                pad={pad}
                pin={pin}
                plain
                scope="col"
                size={widths && widths[property] ? undefined : size}
                style={
                  widths && widths[property]
                    ? { width: widths[property] }
                    : undefined
                }
              >
                {content}
              </StyledDataTableCell>
            );
          },
        )}
      </StyledDataTableRow>
    </StyledDataTableHeader>
  );
};

Header.displayName = 'Header';

Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);

export { Header };
