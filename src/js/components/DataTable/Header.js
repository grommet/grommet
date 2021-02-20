import React, { forwardRef, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';

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
import { datumValue, normalizeBackgroundColor } from './buildState';
import { kindPartStyles } from '../../utils/styles';
import { normalizeColor } from '../../utils/colors';

// separate theme values into groupings depending on what
// part of header cell they should style
const separateThemeProps = theme => {
  const {
    background,
    border,
    color,
    font,
    gap, // gap is used for space between header cell elements only
    units,
    ...rest
  } = theme.dataTable.header;

  const cellProps = { background, border };
  const textProps = { color, ...font };
  const iconProps = { color };
  const layoutProps = { ...rest };

  return [cellProps, layoutProps, textProps, iconProps];
};

// build up CSS from basic to specific based on the supplied sub-object paths.
// adapted from StyledButtonKind to only include parts relevant for DataTable
const buttonStyle = ({ theme }) => {
  const styles = [];
  const [, layoutProps, , iconProps] = separateThemeProps(theme);

  if (layoutProps) {
    styles.push(kindPartStyles(layoutProps, theme));
  }

  if (layoutProps.hover) {
    // CSS for this sub-object in the theme
    const partStyles = kindPartStyles(layoutProps.hover, theme);
    if (partStyles.length > 0)
      styles.push(
        css`
          &:hover {
            ${partStyles}
          }
        `,
      );
  }

  if (iconProps.color) {
    styles.push(
      css`
        svg {
          stroke: ${normalizeColor(iconProps.color, theme)};
          fill: ${normalizeColor(iconProps.color, theme)};
        }
      `,
    );
  }

  return styles;
};

const StyledHeaderCellButton = styled(Button)`
  ${props => buttonStyle(props)}
`;

// allow extend to spread onto Box that surrounds column label
const StyledContentBox = styled(Box)`
  ${props => props.extend}
`;

const Header = forwardRef(
  (
    {
      background: backgroundProp,
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
      rowDetails,
      sort,
      widths,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [cellProps, layoutProps, textProps] = separateThemeProps(theme);

    let background;
    if (backgroundProp) background = backgroundProp;
    else background = undefined;

    return (
      <StyledDataTableHeader ref={ref} fillProp={fill} {...rest}>
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
            <TableCell background={background || cellProps.background}>
              {onSelect && (
                <CheckBox
                  checked={selected.length === data.length}
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  onChange={() => {
                    // if any are selected, clear selection
                    if (selected.length === data.length) onSelect([]);
                    // if none are selected, select all data
                    else
                      onSelect(
                        data.map(datum => datumValue(datum, primaryProperty)),
                      );
                  }}
                />
              )}
            </TableCell>
          )}
          {rowDetails && <TableCell size="xxsmall" plain pad="none" />}
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
              units,
            }) => {
              let content;
              const unitsContent = units ? (
                <Text {...textProps} {...theme.dataTable.header.units}>
                  {units}
                </Text>
              ) : (
                undefined
              );
              if (typeof header === 'string') {
                content = <Text {...textProps}>{header}</Text>;
                if (
                  Object.keys(layoutProps).length &&
                  (sortable === false || !onSort)
                ) {
                  // apply rest of layout styling if cell is not sortable,
                  // otherwise this styling will be applied by
                  // StyledHeaderCellButton
                  content = (
                    <StyledContentBox {...layoutProps}>
                      {content}
                    </StyledContentBox>
                  );
                }
              } else content = header;

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
                  <StyledHeaderCellButton
                    plain
                    column={property}
                    fill="vertical"
                    onClick={onSort(property)}
                    sort={sort}
                    sortable
                  >
                    <Box
                      direction="row"
                      align="center"
                      gap="xsmall"
                      justify={align}
                    >
                      {content}
                      {Icon && <Icon />}
                    </Box>
                  </StyledHeaderCellButton>
                );
              }

              if (unitsContent) {
                content = (
                  <Box align="baseline" direction="row">
                    {content}
                    {unitsContent}
                  </Box>
                );
              }
              // content should fill any available space in cell
              content = <Box flex="grow">{content}</Box>;

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
                    gap={theme.dataTable.header.gap}
                    fill="vertical"
                    style={onResize ? { position: 'relative' } : undefined}
                  >
                    {content}
                    {searcher && resizer ? (
                      <Box
                        flex="shrink"
                        direction="row"
                        align="center"
                        gap={theme.dataTable.header.gap}
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

              if (backgroundProp) background = backgroundProp;
              else if (
                pin.length > 0 &&
                theme.dataTable.pinned &&
                theme.dataTable.pinned.header
              ) {
                background = theme.dataTable.pinned.header.background;
                if (!background.color && theme.background) {
                  // theme context has an active background color but the
                  // theme doesn't set an explicit color, repeat the context
                  // background explicitly
                  background = {
                    ...background,
                    color: normalizeBackgroundColor(theme),
                  };
                }
              } else background = undefined;
              return (
                <StyledDataTableCell
                  key={property}
                  align={align}
                  context="header"
                  verticalAlign={verticalAlign}
                  background={background || cellProps.background}
                  border={border || cellProps.border}
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
  },
);

Header.displayName = 'Header';

Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);

export { Header };
