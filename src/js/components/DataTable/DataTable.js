import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  Fragment,
} from 'react';
import { ThemeContext } from 'styled-components';

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
  normalizePrimaryProperty,
} from './buildState';
import { normalizeShow, usePagination } from '../../utils';
import {
  StyledContainer,
  StyledDataTable,
  StyledPlaceholder,
} from './StyledDataTable';

const contexts = ['header', 'body', 'footer'];

const normalizeProp = (prop, context) => {
  if (prop) {
    if (prop[context]) {
      return prop[context];
    }

    // if prop[context] wasn't defined, but other values
    // exist on the prop, return undefined so that background
    // for context will defaultto theme values instead
    // note: need to include `pinned` since it is not a
    // defined context
    if (contexts.some(c => prop[c] || prop.pinned)) {
      return undefined;
    }
    return prop;
  }
  return undefined;
};

const DataTable = ({
  background,
  border,
  columns = [],
  data = [],
  fill,
  groupBy,
  onClickRow, // removing unknown DOM attributes
  onMore,
  onSearch, // removing unknown DOM attributes
  onSelect,
  onSort: onSortProp,
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
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  // property name of the primary property
  const primaryProperty = useMemo(
    () => normalizePrimaryProperty(columns, primaryKey),
    [columns, primaryKey],
  );

  // whether or not we should show a footer
  const showFooter = useMemo(() => columns.filter(c => c.footer).length > 0, [
    columns,
  ]);

  // what column we are actively capturing filter input on
  const [filtering, setFiltering] = useState();

  // the currently active filters
  const [filters, setFilters] = useState(initializeFilters(columns));

  // which column we are sorting on, with direction
  const [sort, setSort] = useState(sortProp || {});

  // the data filtered and sorted, if needed
  const adjustedData = useMemo(
    () => filterAndSortData(data, filters, onSearch, sort),
    [data, filters, onSearch, sort],
  );

  // the values to put in the footer cells
  const footerValues = useMemo(() => buildFooterValues(columns, adjustedData), [
    adjustedData,
    columns,
  ]);

  // if groupBy, an array with one item per unique groupBy key value
  const groups = useMemo(() => buildGroups(columns, adjustedData, groupBy), [
    adjustedData,
    columns,
    groupBy,
  ]);

  // an object indicating which group values are expanded
  const [groupState, setGroupState] = useState(
    buildGroupState(groups, groupBy),
  );

  const [selected, setSelected] = useState(
    select || (onSelect && []) || undefined,
  );
  useEffect(() => setSelected(select || (onSelect && []) || undefined), [
    onSelect,
    select,
  ]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const nextScrollOffset =
      bodyRef.current.parentElement?.clientWidth - bodyRef.current.clientWidth;
    if (nextScrollOffset !== scrollOffset) setScrollOffset(nextScrollOffset);
  });

  useLayoutEffect(() => {
    if (placeholder) {
      if (headerRef.current) {
        const nextHeaderHeight = headerRef.current.getBoundingClientRect()
          .height;
        setHeaderHeight(nextHeaderHeight);
      } else setHeaderHeight(0);
      if (footerRef.current) {
        const nextFooterHeight = footerRef.current.getBoundingClientRect()
          .height;
        setFooterHeight(nextFooterHeight);
      } else setFooterHeight(0);
    }
  }, [footerRef, headerRef, placeholder]);

  // remember that we are filtering on this property
  const onFiltering = property => setFiltering(property);

  // remember the search text we should filter this property by
  const onFilter = (property, value) => {
    const nextFilters = { ...filters };
    nextFilters[property] = value;
    setFilters(nextFilters);
    // Let caller know about search, if interested
    if (onSearch) onSearch(nextFilters);
  };

  // toggle the sort direction on this property
  const onSort = property => () => {
    const external = sort ? sort.external : false;
    let direction;
    if (!sort || property !== sort.property) direction = 'asc';
    else if (sort.direction === 'asc') direction = 'desc';
    else direction = 'asc';
    const nextSort = { property, direction, external };
    setSort(nextSort);
    if (onSortProp) onSortProp(nextSort);
  };

  // toggle whether the group is expanded
  const onToggleGroup = groupValue => () => {
    const nextGroupState = { ...groupState };
    nextGroupState[groupValue] = {
      ...nextGroupState[groupValue],
      expanded: !nextGroupState[groupValue].expanded,
    };
    setGroupState(nextGroupState);
    if (groupBy.onExpand) {
      const expandedKeys = Object.keys(nextGroupState).filter(
        k => nextGroupState[k].expanded,
      );
      groupBy.onExpand(expandedKeys);
    }
  };

  // toggle whether all groups are expanded
  const onToggleGroups = () => {
    const expanded =
      Object.keys(groupState).filter(k => !groupState[k].expanded).length === 0;
    const nextGroupState = {};
    Object.keys(groupState).forEach(k => {
      nextGroupState[k] = { ...groupState[k], expanded: !expanded };
    });
    setGroupState(nextGroupState);
    if (groupBy.onExpand) {
      const expandedKeys = Object.keys(nextGroupState).filter(
        k => nextGroupState[k].expanded,
      );
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

  const [items, paginationProps] = usePagination({
    data: adjustedData,
    page: normalizeShow(showProp, step),
    step,
    ...paginate, // let any specifications from paginate prop override component
  });

  const Container = paginate ? StyledContainer : Fragment;
  const containterProps = paginate
    ? { ...theme.dataTable.container }
    : undefined;

  return (
    <Container {...containterProps}>
      <StyledDataTable fillProp={fill} {...rest}>
        <Header
          ref={headerRef}
          background={normalizeProp(background, 'header')}
          border={normalizeProp(border, 'header')}
          columns={columns}
          data={adjustedData}
          fill={fill}
          filtering={filtering}
          filters={filters}
          groups={groups}
          groupState={groupState}
          pad={normalizeProp(pad, 'header')}
          pin={pin === true || pin === 'header'}
          selected={selected}
          size={size}
          sort={sort}
          widths={widths}
          onFiltering={onFiltering}
          onFilter={onFilter}
          onResize={resizeable ? onResize : undefined}
          onSelect={
            onSelect
              ? nextSelected => {
                  setSelected(nextSelected);
                  if (onSelect) onSelect(nextSelected);
                }
              : undefined
          }
          onSort={sortable || sortProp || onSortProp ? onSort : undefined}
          onToggle={onToggleGroups}
          primaryProperty={primaryProperty}
          scrollOffset={scrollOffset}
          rowDetails={rowDetails}
        />
        {groups ? (
          <GroupedBody
            ref={bodyRef}
            background={normalizeProp(background, 'body')}
            border={normalizeProp(border, 'body')}
            columns={columns}
            groupBy={groupBy.property ? groupBy.property : groupBy}
            groups={groups}
            groupState={groupState}
            pad={normalizeProp(pad, 'body')}
            primaryProperty={primaryProperty}
            onToggle={onToggleGroup}
            size={size}
          />
        ) : (
          <Body
            ref={bodyRef}
            background={normalizeProp(background, 'body')}
            border={normalizeProp(border, 'body')}
            columns={columns}
            data={!paginate ? adjustedData : items}
            onMore={onMore}
            replace={replace}
            onClickRow={onClickRow}
            onSelect={
              onSelect
                ? nextSelected => {
                    setSelected(nextSelected);
                    if (onSelect) onSelect(nextSelected);
                  }
                : undefined
            }
            pad={normalizeProp(pad, 'body')}
            pinnedBackground={normalizeProp(background, 'pinned')}
            placeholder={placeholder}
            primaryProperty={primaryProperty}
            rowProps={rowProps}
            selected={selected}
            show={!paginate ? showProp : undefined}
            size={size}
            step={step}
            rowDetails={rowDetails}
            rowExpand={rowExpand}
            setRowExpand={setRowExpand}
          />
        )}
        {showFooter && (
          <Footer
            ref={footerRef}
            background={normalizeProp(background, 'footer')}
            border={normalizeProp(border, 'footer')}
            columns={columns}
            fill={fill}
            footerValues={footerValues}
            groups={groups}
            onSelect={onSelect}
            pad={normalizeProp(pad, 'footer')}
            pin={pin === true || pin === 'footer'}
            primaryProperty={primaryProperty}
            scrollOffset={scrollOffset}
            selected={selected}
            size={size}
          />
        )}
        {placeholder && (
          <StyledPlaceholder top={headerHeight} bottom={footerHeight}>
            {typeof placeholder === 'string' ? (
              <Box
                background={{ color: 'background-front', opacity: 'strong' }}
                align="center"
                justify="center"
                fill="vertical"
              >
                <Text>{placeholder}</Text>
              </Box>
            ) : (
              placeholder
            )}
          </StyledPlaceholder>
        )}
      </StyledDataTable>
      {paginate && items && <Pagination alignSelf="end" {...paginationProps} />}
    </Container>
  );
};

let DataTableDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataTableDoc = require('./doc').doc(DataTable);
}
const DataTableWrapper = DataTableDoc || DataTable;

export { DataTableWrapper as DataTable };
