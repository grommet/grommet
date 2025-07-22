/* eslint-disable no-underscore-dangle */
import React, { forwardRef, useCallback, useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { TableCell, verticalAlignToJustify } from '../TableCell/TableCell';
import { Text } from '../Text';

import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { ExpanderCell } from './ExpanderCell';
import {
  StyledDataTableCell,
  StyledDataTableHeader,
  StyledDataTableRowHeader,
} from './StyledDataTable';
import { datumValue } from './buildState';
import { kindPartStyles } from '../../utils/styles';
import { normalizeColor } from '../../utils/colors';
import { useThemeValue } from '../../utils/useThemeValue';

// delay before triggering width update. This allows most/all header resizes
// to be batched together causing fewer render passes
const WIDTH_UPDATE_DELAY = 100;

// separate theme values into groupings depending on what
// part of header cell they should style
const separateThemeProps = (theme) => {
  const {
    background, // covered by cellProps
    border, // covered by cellProps
    color,
    font,
    gap, // gap is used for space between header cell elements only
    pad, // covered by cellProps
    units,
    ...rest
  } = theme.dataTable.header;

  const textProps = { color, ...font };
  const iconProps = { color };
  const layoutProps = { ...rest };

  return [layoutProps, textProps, iconProps];
};

// build up CSS from basic to specific based on the supplied sub-object paths.
// adapted from StyledButtonKind to only include parts relevant for DataTable
const buttonStyle = ({ pad, theme, verticalAlign }) => {
  const styles = [];
  const [layoutProps, , iconProps] = separateThemeProps(theme);

  // if cell is sortable, we want pad to be applied
  // to the button instead of the cell
  if (pad) {
    styles.push(kindPartStyles({ pad }, theme));
  }

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

  let align = 'center';
  if (verticalAlign === 'bottom') align = 'end';
  if (verticalAlign === 'top') align = 'start';

  if (verticalAlign) {
    styles.push(
      css`
        display: inline-flex;
        align-items: ${align};
      `,
    );
  }

  return styles;
};

const StyledHeaderCellButton = styled(Button)`
  ${(props) => buttonStyle(props)}
`;

// allow extend to spread onto Box that surrounds column label
const StyledContentBox = styled(Box)`
  ${(props) => props.extend}
`;

const Header = forwardRef(
  (
    {
      allowSelectAll,
      cellProps,
      columns,
      data,
      disabled,
      fill,
      filtering,
      filters,
      groupBy,
      groups,
      groupState,
      messages,
      onFilter,
      onFiltering,
      onResize,
      onSelect,
      onSort,
      onToggle,
      onWidths,
      pin: pinProp,
      pinnedOffset,
      primaryProperty,
      selected,
      rowDetails,
      sort,
      widths,
      verticalAlign,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const [layoutProps, textProps] = separateThemeProps(theme);
    const { total: contextTotal } = useContext(DataContext);
    const { format } = useContext(MessageContext);

    const cellWidthsRef = useRef({});
    const timerRef = useRef();

    const handleWidths = useCallback(() => {
      const cellWidths = cellWidthsRef.current;
      if (onWidths && cellWidths) {
        const internalColumnWidths =
          selected || onSelect ? [cellWidths._grommetDataTableSelect] : [];
        onWidths([
          ...internalColumnWidths,
          ...columns.map(({ property }) => cellWidths[property]),
        ]);
      }
    }, [columns, onSelect, onWidths, selected]);

    const updateWidths = useCallback(
      (property, width) => {
        if (typeof width !== 'number') return;
        // Only update if width actually changed
        if (cellWidthsRef?.current[property] !== width) {
          cellWidthsRef.current[property] = width;
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(handleWidths, WIDTH_UPDATE_DELAY);
        }
      },
      [handleWidths],
    );

    const pin = pinProp ? ['top'] : [];
    const selectPin = pinnedOffset?._grommetDataTableSelect
      ? [...pin, 'left']
      : pin;

    const totalSelectedGroups = groupBy?.select
      ? Object.keys(groupBy.select).reduce(
          (total, cur) =>
            cur && groupBy.select[cur] === 'all' ? total + 1 : total,
          0,
        )
      : 0;
    const totalSelected = (selected?.length || 0) + totalSelectedGroups;

    const onChangeSelection = useCallback(() => {
      const nextSelected = [...selected];
      const nextGroupSelected = {};

      // get primary values for current data view
      const primaryValues =
        data.map((datum) => datumValue(datum, primaryProperty)) || [];

      // enabled includes what can be changed
      const enabled =
        (disabled && primaryValues.filter((v) => !disabled.includes(v))) ||
        primaryValues;
      // enabledSelected includes what can be changed and is currently selected
      const enabledSelected =
        (selected && enabled.filter((v) => selected.includes(v))) ||
        primaryValues;

      const allSelected = groupBy?.select
        ? groupBy.select[''] === 'all'
        : enabledSelected.length === enabled.length;

      // if all enabled are already selected, remove them from selected,
      // otherwise add them.
      if (allSelected) {
        enabledSelected.forEach((p) => {
          const index = nextSelected.indexOf(p);
          if (index >= 0) {
            nextSelected.splice(index, 1);
          }
        });
        nextGroupSelected[''] = 'none';
      } else {
        enabled.forEach((p) => {
          if (!nextSelected.includes(p)) {
            nextSelected.push(p);
          }
        });
        nextGroupSelected[''] = 'all';
        groupBy?.expandable?.forEach((key) => {
          nextGroupSelected[key] = 'all';
        });
      }

      if (groupBy?.onSelect) {
        groupBy.onSelect(nextSelected, undefined, nextGroupSelected);
      } else onSelect(nextSelected);
    }, [data, disabled, groupBy, onSelect, primaryProperty, selected]);

    return (
      <StyledDataTableHeader ref={ref} fillProp={fill} {...rest}>
        <StyledDataTableRowHeader>
          {groups && (
            <ExpanderCell
              background={cellProps.background}
              border={cellProps.border}
              context="header"
              expanded={
                Object.keys(groupState).filter((k) => !groupState[k].expanded)
                  .length === 0
              }
              onToggle={onToggle}
              pad={cellProps.pad}
            />
          )}

          {(selected || onSelect) && (
            <StyledDataTableCell
              background={cellProps.background}
              onWidth={(width) =>
                updateWidths('_grommetDataTableSelect', width)
              }
              plain="noPad"
              size="auto"
              context="header"
              scope="col"
              pin={selectPin}
              pinnedOffset={pinnedOffset?._grommetDataTableSelect}
              verticalAlign={verticalAlign}
              {...passThemeFlag}
            >
              {onSelect && allowSelectAll && (
                <CheckBox
                  a11yTitle={
                    totalSelected === data.length
                      ? 'unselect all'
                      : 'select all'
                  }
                  checked={
                    groupBy?.select
                      ? groupBy.select[''] === 'all'
                      : totalSelected > 0 &&
                        data.length > 0 &&
                        totalSelected === (contextTotal || data.length)
                  }
                  indeterminate={
                    groupBy?.select
                      ? groupBy.select[''] === 'some'
                      : totalSelected > 0 &&
                        totalSelected < (contextTotal || data.length)
                  }
                  onChange={onChangeSelection}
                  pad={cellProps.pad}
                />
              )}
            </StyledDataTableCell>
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
              verticalAlign: columnVerticalAlign, // depcrecate in v3
              size,
              units,
            }) => {
              let content;
              const unitsContent = units ? (
                <Text {...textProps} {...theme.dataTable.header.units}>
                  {units}
                </Text>
              ) : undefined;
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

              if (unitsContent) {
                content = (
                  <Box justify={align} direction="row">
                    {content}
                    {unitsContent}
                  </Box>
                );
              }

              if (verticalAlign || columnVerticalAlign) {
                const vertical = verticalAlign || columnVerticalAlign;
                content = (
                  <Box height="100%" justify={verticalAlignToJustify[vertical]}>
                    {content}
                  </Box>
                );
              }

              let ariaSort;
              if (onSort && sortable !== false) {
                let Icon;
                let iconAriaLabel;
                if (onSort && sortable !== false) {
                  if (sort && sort.property === property) {
                    Icon =
                      theme.dataTable.icons[
                        sort.direction !== 'asc' ? 'ascending' : 'descending'
                      ];
                    if (sort.direction === 'asc') {
                      ariaSort = 'ascending';
                      iconAriaLabel = format({
                        id: 'dataTable.ascending',
                        messages,
                      });
                    } else if (sort.direction === 'desc') {
                      ariaSort = 'descending';
                      iconAriaLabel = format({
                        id: 'dataTable.descending',
                        messages,
                      });
                    }
                  } else if (theme.dataTable.icons.sortable) {
                    Icon = theme.dataTable.icons.sortable;
                  }
                }

                content = (
                  <StyledHeaderCellButton
                    plain
                    column={property}
                    fill="vertical"
                    focusIndicator={size ? 'inset' : undefined}
                    onClick={onSort(property)}
                    sort={sort}
                    pad={cellProps.pad}
                    sortable
                    verticalAlign={verticalAlign || columnVerticalAlign}
                    {...passThemeFlag}
                  >
                    <Box
                      direction="row"
                      align="center"
                      gap="xsmall"
                      justify={align}
                    >
                      {content}
                      {Icon && <Icon aria-label={iconAriaLabel} />}
                    </Box>
                  </StyledHeaderCellButton>
                );
              }

              // content should fill any available space in cell
              // If `onResize` or `search` is true we need to explicitly set
              // fill because later if either of these props is true content
              // will be wrapped with an additional Box, preventing this Box
              // from automatically filling the vertical space.
              content = (
                <Box
                  flex={onResize || search ? { grow: 1, shrink: 1 } : 'grow'}
                  fill={onResize || search ? 'vertical' : false}
                  justify={(!align && 'center') || align}
                >
                  {content}
                </Box>
              );

              if (search) {
                const searcher =
                  search && filters ? (
                    <Searcher
                      filtering={filtering}
                      filters={filters}
                      focusIndicator={size ? 'inset' : undefined}
                      messages={messages}
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
                    {searcher && onResize ? (
                      <Box
                        // padding right set to half (12px) of resizer
                        // width (24px) to gives extra room for resizer control.
                        pad={{ right: '12px' }}
                        flex={{
                          shrink: filtering === property ? 1 : 0,
                        }}
                        direction={filtering === property ? 'column' : 'row'}
                        margin={{
                          right: 'xsmall',
                        }}
                      >
                        {searcher}
                      </Box>
                    ) : (
                      searcher
                    )}
                  </Box>
                );
              }
              const cellPin = [...pin];
              if (columnPin) cellPin.push('left');

              const headerId = `grommet-data-table-header-${property}`;

              return (
                <StyledDataTableCell
                  aria-sort={ariaSort}
                  key={property}
                  align={align}
                  context="header"
                  verticalAlign={verticalAlign || columnVerticalAlign}
                  background={cellProps.background}
                  border={cellProps.border}
                  id={headerId}
                  onWidth={(width) => updateWidths(property, width)}
                  // if sortable, pad will be included in the button styling
                  pad={sortable === false || !onSort ? cellProps.pad : 'none'}
                  pin={cellPin}
                  plain
                  pinnedOffset={pinnedOffset && pinnedOffset[property]}
                  scope="col"
                  size={widths && widths[property] ? undefined : size}
                  style={{
                    width: widths?.[property]
                      ? `${widths[property]}px`
                      : undefined,
                    boxSizing: onResize ? 'border-box' : undefined,
                    position: onResize ? 'relative' : undefined,
                    overflow: onResize ? 'visible' : undefined,
                  }}
                  onResize={onResize}
                  property={property}
                  {...passThemeFlag}
                >
                  {content}
                  {onResize && (
                    <Resizer
                      property={property}
                      onResize={(prop, width) => {
                        onResize(prop, width);
                        updateWidths(prop, width);
                      }}
                      headerText={
                        typeof header === 'string' ? header : property
                      }
                      messages={messages}
                      headerId={headerId}
                    />
                  )}
                </StyledDataTableCell>
              );
            },
          )}
        </StyledDataTableRowHeader>
      </StyledDataTableHeader>
    );
  },
);

Header.displayName = 'Header';

export { Header };
