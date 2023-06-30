import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  Fragment,
} from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Text } from '../Text';
import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import { Pagination } from '../Pagination';
import {
  buildFooterValues,
  buildGroups,
  buildGroupState,
  filterAndSortData,
  initializeFilters,
  normalizeCellProps,
  normalizePrimaryProperty,
} from './buildState';
import { normalizeShow, usePagination } from '../../utils';
import {
  StyledContainer,
  StyledDataTable,
  StyledPlaceholder,
} from './StyledDataTable';
import { DataTablePropTypes } from './propTypes';
import { PlaceholderBody } from './PlaceholderBody';

const emptyData = [];

function useGroupState(groups, groupBy) {
  const [groupState, setGroupState] = useState(() =>
    buildGroupState(groups, groupBy),
  );
  const [prevDeps, setPrevDeps] = useState({ groups, groupBy });

  const { groups: prevGroups, groupBy: prevGroupBy } = prevDeps;
  if (groups !== prevGroups || groupBy !== prevGroupBy) {
    setPrevDeps({ groups, groupBy });
    const nextGroupState = buildGroupState(groups, groupBy);
    setGroupState(nextGroupState);
    return [nextGroupState, setGroupState];
  }

  return [groupState, setGroupState];
}

const DataTable = ({
  background,
  border,
  columns: columnsProp,
  data: dataProp,
  disabled,
  fill,
  groupBy: groupByProp,
  onClickRow, // removing unknown DOM attributes
  onMore,
  onSearch, // removing unknown DOM attributes
  onSelect,
  onSort: onSortProp,
  onUpdate,
  replace,
  pad,
  paginate,
  pin,
  placeholder,
  primaryKey,
  resizeable,
  rowProps,
  select,
  show: showProp,
  size,
  sort: sortProp,
  sortable,
  rowDetails,
  step = 50,
  verticalAlign,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const {
    view,
    data: contextData,
    properties,
    onView,
  } = useContext(DataContext);
  const data = dataProp || contextData || emptyData;

  const columns = useMemo(() => {
    let result = [];
    if (columnsProp) result = columnsProp;
    else if (properties)
      result = Object.keys(properties).map((p) => ({
        property: p,
        ...properties[p],
      }));
    else if (data.length)
      result = Object.keys(data[0]).map((p) => ({ property: p }));
    if (view?.columns)
      result = result
        .filter((c) => view.columns.includes(c.property))
        .sort(
          (c1, c2) =>
            view.columns.indexOf(c1.property) -
            view.columns.indexOf(c2.property),
        );
    return result;
  }, [columnsProp, data, properties, view]);

  // property name of the primary property
  const primaryProperty = useMemo(
    () => normalizePrimaryProperty(columns, primaryKey),
    [columns, primaryKey],
  );

  // whether or not we should show a footer
  const showFooter = useMemo(
    () => columns.filter((c) => c.footer).length > 0,
    [columns],
  );

  // what column we are actively capturing filter input on
  const [filtering, setFiltering] = useState();

  // the currently active filters
  const [filters, setFilters] = useState(initializeFilters(columns));

  // which column we are sorting on, with direction
  const [sort, setSort] = useState(sortProp || {});
  useEffect(() => {
    if (sortProp) setSort(sortProp);
    else if (view?.sort) setSort(view.sort);
  }, [sortProp, view]);

  // what we are grouping on
  const groupBy = view?.groupBy || groupByProp;

  // the data filtered and sorted, if needed
  // Note: onUpdate mode expects the data to be passed
  //   in completely filtered and sorted already.
  const adjustedData = useMemo(
    () => (onUpdate ? data : filterAndSortData(data, filters, onSearch, sort)),
    [data, filters, onSearch, onUpdate, sort],
  );

  // the values to put in the footer cells
  const footerValues = useMemo(
    () => buildFooterValues(columns, adjustedData),
    [adjustedData, columns],
  );

  // cell styling properties: background, border, pad
  const cellProps = useMemo(
    () => normalizeCellProps({ background, border, pad, pin }, theme),
    [background, border, pad, pin, theme],
  );

  // if groupBy, an array with one item per unique groupBy key value
  const groups = useMemo(
    () => buildGroups(columns, adjustedData, groupBy, primaryProperty),
    [adjustedData, columns, groupBy, primaryProperty],
  );

  // an object indicating which group values are expanded
  const [groupState, setGroupState] = useGroupState(groups, groupBy);

  const [limit, setLimit] = useState(step);

  const [selected, setSelected] = useState(
    select || (onSelect && []) || undefined,
  );
  useEffect(
    () => setSelected(select || (onSelect && []) || undefined),
    [onSelect, select],
  );

  const [rowExpand, setRowExpand] = useState([]);

  // any customized column widths
  const [widths, setWidths] = useState({});

  // placeholder placement stuff
  const headerRef = useRef();
  const bodyRef = useRef();
  const footerRef = useRef();
  const [headerHeight, setHeaderHeight] = useState();
  const [footerHeight, setFooterHeight] = useState();

  // offset compensation when body overflows
  const [scrollOffset, setScrollOffset] = useState(0);

  // multiple pinned columns offset
  const [pinnedOffset, setPinnedOffset] = useState();

  const onHeaderWidths = useCallback(
    (columnWidths) => {
      const hasSelectColumn = Boolean(select || onSelect);
      let pinnedProperties = columns
        .map((pinnedColumn) => pinnedColumn.pin && pinnedColumn.property)
        .filter((n) => n);
      if (hasSelectColumn && pinnedProperties.length > 0) {
        pinnedProperties = ['_grommetDataTableSelect', ...pinnedProperties];
      }
      const nextPinnedOffset = {};

      if (columnWidths !== []) {
        pinnedProperties.forEach((property, index) => {
          const columnIndex =
            property === '_grommetDataTableSelect'
              ? 0
              : columns.findIndex((column) => column.property === property) +
                hasSelectColumn;
          if (columnWidths[columnIndex]) {
            nextPinnedOffset[property] = {
              width: columnWidths[columnIndex],
              left:
                index === 0
                  ? 0
                  : nextPinnedOffset[pinnedProperties[index - 1]].left +
                    nextPinnedOffset[pinnedProperties[index - 1]].width,
            };
          }
        });
        setPinnedOffset(nextPinnedOffset);
      }
    },
    [columns, setPinnedOffset, select, onSelect],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const nextScrollOffset =
      (bodyRef.current.parentElement?.clientWidth || 0) -
      bodyRef.current.clientWidth;
    if (nextScrollOffset !== scrollOffset) setScrollOffset(nextScrollOffset);
  });

  useLayoutEffect(() => {
    if (placeholder) {
      if (headerRef.current) {
        const nextHeaderHeight =
          headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(nextHeaderHeight);
      } else setHeaderHeight(0);
      if (footerRef.current) {
        const nextFooterHeight =
          footerRef.current.getBoundingClientRect().height;
        setFooterHeight(nextFooterHeight);
      } else setFooterHeight(0);
    }
  }, [footerRef, headerRef, placeholder]);

  // remember that we are filtering on this property
  const onFiltering = (property) => setFiltering(property);

  // remember the search text we should filter this property by
  const onFilter = (property, value) => {
    const nextFilters = { ...filters };
    nextFilters[property] = value;
    setFilters(nextFilters);
    // Let caller know about search, if interested
    if (onSearch) onSearch(nextFilters);
  };

  // toggle the sort direction on this property
  const onSort = (property) => () => {
    const external = sort ? sort.external : false;
    let direction;
    if (!sort || property !== sort.property) direction = 'asc';
    else if (sort.direction === 'asc') direction = 'desc';
    else direction = 'asc';
    const nextSort = { property, direction, external };
    setSort(nextSort);
    if (onView) {
      onView({ ...view, sort: { property, direction } });
    }
    if (onUpdate) {
      const opts = {
        count: limit,
        sort: nextSort,
      };
      if (groups) {
        opts.expanded = Object.keys(groupState).filter(
          (k) => groupState[k].expanded,
        );
      }
      if (showProp) opts.show = showProp;
      onUpdate(opts);
    }
    if (onSortProp) onSortProp(nextSort);
  };

  // toggle whether the group is expanded
  const onToggleGroup = (groupValue) => () => {
    const nextGroupState = { ...groupState };
    nextGroupState[groupValue] = {
      ...nextGroupState[groupValue],
      expanded: !nextGroupState[groupValue].expanded,
    };
    setGroupState(nextGroupState);
    const expandedKeys = Object.keys(nextGroupState).filter(
      (k) => nextGroupState[k].expanded,
    );
    if (onUpdate) {
      const opts = {
        expanded: expandedKeys,
        count: limit,
      };
      if (sort?.property) opts.sort = sort;
      if (showProp) opts.show = showProp;
      onUpdate(opts);
    }
    if (groupBy.onExpand) {
      groupBy.onExpand(expandedKeys);
    }
  };

  // toggle whether all groups are expanded
  const onToggleGroups = () => {
    const expanded =
      Object.keys(groupState).filter((k) => !groupState[k].expanded).length ===
      0;
    const nextGroupState = {};
    Object.keys(groupState).forEach((k) => {
      nextGroupState[k] = { ...groupState[k], expanded: !expanded };
    });
    setGroupState(nextGroupState);
    const expandedKeys = Object.keys(nextGroupState).filter(
      (k) => nextGroupState[k].expanded,
    );
    if (onUpdate) {
      const opts = {
        expanded: expandedKeys,
        count: limit,
      };
      if (showProp) opts.show = showProp;
      if (sort?.property) opts.sort = sort;
      onUpdate(opts);
    }
    if (groupBy.onExpand) {
      groupBy.onExpand(expandedKeys);
    }
  };

  // remember the width this property's column should be
  const onResize = useCallback(
    (property, width) => {
      if (widths[property] !== width) {
        const nextWidths = { ...widths };
        nextWidths[property] = width;
        setWidths(nextWidths);
      }
    },
    [widths],
  );

  if (size && resizeable) {
    console.warn('DataTable cannot combine "size" and "resizeble".');
  }
  if (onUpdate && onMore) {
    console.warn('DataTable cannot combine "onUpdate" and "onMore".');
  }

  const [items, paginationProps] = usePagination({
    data: adjustedData,
    page: normalizeShow(showProp, step),
    step,
    ...paginate, // let any specifications from paginate prop override component
  });
  const { step: paginationStep } = paginationProps;

  const Container = paginate ? StyledContainer : Fragment;
  const containterProps = paginate
    ? { ...theme.dataTable.container, fill }
    : undefined;

  // DataTable should overflow if paginating but pagination component
  // should remain in its location
  const OverflowContainer = paginate ? Box : Fragment;
  const overflowContainerProps = paginate
    ? { overflow: { horizontal: 'auto' } }
    : undefined;

  // necessary for Firefox, otherwise paginated DataTable will
  // not fill its container like it does by default on other
  // browsers like Chrome/Safari
  const paginatedDataTableProps =
    paginate && (fill === true || fill === 'horizontal')
      ? { style: { minWidth: '100%' } }
      : undefined;

  let placeholderContent = placeholder;
  if (placeholder && typeof placeholder === 'string') {
    placeholderContent = (
      <Box
        background={{ color: 'background-front', opacity: 'strong' }}
        align="center"
        justify="center"
        fill="vertical"
      >
        <Text>{placeholder}</Text>
      </Box>
    );
  }

  const bodyContent = groups ? (
    <GroupedBody
      ref={bodyRef}
      cellProps={cellProps.body}
      columns={columns}
      disabled={disabled}
      groupBy={typeof groupBy === 'string' ? { property: groupBy } : groupBy}
      groups={groups}
      groupState={groupState}
      pinnedOffset={pinnedOffset}
      primaryProperty={primaryProperty}
      onMore={
        onUpdate
          ? () => {
              if (adjustedData.length === limit) {
                const opts = {
                  expanded: Object.keys(groupState).filter(
                    (k) => groupState[k].expanded,
                  ),
                  count: limit + paginationStep,
                };
                if (sort?.property) opts.sort = sort;
                if (showProp) opts.show = showProp;
                onUpdate(opts);
                setLimit((prev) => prev + paginationStep);
              }
            }
          : onMore
      }
      onSelect={
        onSelect
          ? (nextSelected, row) => {
              setSelected(nextSelected);
              if (onSelect) onSelect(nextSelected, row);
            }
          : undefined
      }
      onToggle={onToggleGroup}
      onUpdate={onUpdate}
      replace={replace}
      rowProps={rowProps}
      selected={selected}
      size={size}
      step={paginationStep}
      verticalAlign={
        typeof verticalAlign === 'string' ? verticalAlign : verticalAlign?.body
      }
    />
  ) : (
    <Body
      ref={bodyRef}
      cellProps={cellProps.body}
      columns={columns}
      data={!paginate ? adjustedData : items}
      disabled={disabled}
      onMore={
        onUpdate
          ? () => {
              if (adjustedData.length === limit) {
                const opts = {
                  count: limit + paginationStep,
                };
                if (sort?.property) opts.sort = sort;
                if (showProp) opts.show = showProp;
                onUpdate(opts);
                setLimit((prev) => prev + paginationStep);
              }
            }
          : onMore
      }
      replace={replace}
      onClickRow={onClickRow}
      onSelect={
        onSelect
          ? (nextSelected, row) => {
              setSelected(nextSelected);
              if (onSelect) onSelect(nextSelected, row);
            }
          : undefined
      }
      pinnedCellProps={cellProps.pinned}
      pinnedOffset={pinnedOffset}
      primaryProperty={primaryProperty}
      rowProps={rowProps}
      selected={selected}
      show={!paginate ? showProp : undefined}
      size={size}
      step={paginationStep}
      rowDetails={rowDetails}
      rowExpand={rowExpand}
      setRowExpand={setRowExpand}
      verticalAlign={
        typeof verticalAlign === 'string' ? verticalAlign : verticalAlign?.body
      }
    />
  );

  return (
    <Container {...containterProps}>
      <OverflowContainer {...overflowContainerProps}>
        <StyledDataTable
          fillProp={!paginate ? fill : undefined}
          {...paginatedDataTableProps}
          {...rest}
        >
          <Header
            ref={headerRef}
            cellProps={cellProps.header}
            columns={columns}
            data={adjustedData}
            disabled={disabled}
            fill={fill}
            filtering={filtering}
            filters={filters}
            groupBy={groupBy}
            groups={groups}
            groupState={groupState}
            pin={pin === true || pin === 'header'}
            pinnedOffset={pinnedOffset}
            selected={selected}
            size={size}
            sort={sort}
            widths={widths}
            onFiltering={onFiltering}
            onFilter={onFilter}
            onResize={resizeable ? onResize : undefined}
            onSelect={
              onSelect
                ? (nextSelected) => {
                    setSelected(nextSelected);
                    if (onSelect) onSelect(nextSelected);
                  }
                : undefined
            }
            onSort={sortable || sortProp || onSortProp ? onSort : undefined}
            onToggle={onToggleGroups}
            onWidths={onHeaderWidths}
            primaryProperty={primaryProperty}
            scrollOffset={scrollOffset}
            rowDetails={rowDetails}
            verticalAlign={
              typeof verticalAlign === 'string'
                ? verticalAlign
                : verticalAlign?.header
            }
          />
          {placeholder && (!items || items.length === 0) ? (
            <PlaceholderBody
              ref={bodyRef}
              columns={columns}
              onSelect={onSelect}
            >
              {placeholderContent}
            </PlaceholderBody>
          ) : (
            bodyContent
          )}
          {showFooter && (
            <Footer
              ref={footerRef}
              cellProps={cellProps.footer}
              columns={columns}
              fill={fill}
              footerValues={footerValues}
              groups={groups}
              onSelect={onSelect}
              pin={pin === true || pin === 'footer'}
              pinnedOffset={pinnedOffset}
              primaryProperty={primaryProperty}
              scrollOffset={scrollOffset}
              selected={selected}
              size={size}
              verticalAlign={
                typeof verticalAlign === 'string'
                  ? verticalAlign
                  : verticalAlign?.footer
              }
            />
          )}
          {placeholder && items && items.length > 0 && (
            <StyledPlaceholder top={headerHeight} bottom={footerHeight}>
              {placeholderContent}
            </StyledPlaceholder>
          )}
        </StyledDataTable>
      </OverflowContainer>
      {paginate &&
      adjustedData.length > paginationStep &&
      items &&
      items.length ? (
        <Pagination alignSelf="end" {...paginationProps} />
      ) : null}
    </Container>
  );
};

DataTable.propTypes = DataTablePropTypes;

export { DataTable };
