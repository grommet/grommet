var _excluded = ["background", "border", "columns", "data", "fill", "groupBy", "onClickRow", "onMore", "onSearch", "onSelect", "onSort", "replace", "pad", "paginate", "pin", "placeholder", "primaryKey", "resizeable", "rowProps", "select", "show", "size", "sort", "sortable", "rowDetails", "step"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, Fragment } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { Box } from '../Box';
import { Text } from '../Text';
import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import { Pagination } from '../Pagination';
import { buildFooterValues, buildGroups, buildGroupState, filterAndSortData, initializeFilters, normalizeCellProps, normalizePrimaryProperty } from './buildState';
import { normalizeShow, usePagination } from '../../utils';
import { StyledContainer, StyledDataTable, StyledPlaceholder } from './StyledDataTable';
import { DataTablePropTypes } from './propTypes';

function useGroupState(groups, groupBy) {
  var _useState = useState(function () {
    return buildGroupState(groups, groupBy);
  }),
      groupState = _useState[0],
      setGroupState = _useState[1];

  var _useState2 = useState({
    groups: groups,
    groupBy: groupBy
  }),
      prevDeps = _useState2[0],
      setPrevDeps = _useState2[1];

  var prevGroups = prevDeps.groups,
      prevGroupBy = prevDeps.groupBy;

  if (groups !== prevGroups || groupBy !== prevGroupBy) {
    setPrevDeps({
      groups: groups,
      groupBy: groupBy
    });
    var nextGroupState = buildGroupState(groups, groupBy);
    setGroupState(nextGroupState);
    return [nextGroupState, setGroupState];
  }

  return [groupState, setGroupState];
}

var DataTable = function DataTable(_ref) {
  var background = _ref.background,
      border = _ref.border,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? [] : _ref$columns,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      fill = _ref.fill,
      groupBy = _ref.groupBy,
      onClickRow = _ref.onClickRow,
      onMore = _ref.onMore,
      onSearch = _ref.onSearch,
      onSelect = _ref.onSelect,
      onSortProp = _ref.onSort,
      replace = _ref.replace,
      pad = _ref.pad,
      paginate = _ref.paginate,
      pin = _ref.pin,
      placeholder = _ref.placeholder,
      primaryKey = _ref.primaryKey,
      resizeable = _ref.resizeable,
      rowProps = _ref.rowProps,
      select = _ref.select,
      showProp = _ref.show,
      size = _ref.size,
      sortProp = _ref.sort,
      sortable = _ref.sortable,
      rowDetails = _ref.rowDetails,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 50 : _ref$step,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme; // property name of the primary property

  var primaryProperty = useMemo(function () {
    return normalizePrimaryProperty(columns, primaryKey);
  }, [columns, primaryKey]); // whether or not we should show a footer

  var showFooter = useMemo(function () {
    return columns.filter(function (c) {
      return c.footer;
    }).length > 0;
  }, [columns]); // what column we are actively capturing filter input on

  var _useState3 = useState(),
      filtering = _useState3[0],
      setFiltering = _useState3[1]; // the currently active filters


  var _useState4 = useState(initializeFilters(columns)),
      filters = _useState4[0],
      setFilters = _useState4[1]; // which column we are sorting on, with direction


  var _useState5 = useState(sortProp || {}),
      sort = _useState5[0],
      setSort = _useState5[1]; // the data filtered and sorted, if needed


  var adjustedData = useMemo(function () {
    return filterAndSortData(data, filters, onSearch, sort);
  }, [data, filters, onSearch, sort]); // the values to put in the footer cells

  var footerValues = useMemo(function () {
    return buildFooterValues(columns, adjustedData);
  }, [adjustedData, columns]); // cell styling properties: background, border, pad

  var cellProps = useMemo(function () {
    return normalizeCellProps({
      background: background,
      border: border,
      pad: pad,
      pin: pin
    }, theme);
  }, [background, border, pad, pin, theme]); // if groupBy, an array with one item per unique groupBy key value

  var groups = useMemo(function () {
    return buildGroups(columns, adjustedData, groupBy);
  }, [adjustedData, columns, groupBy]); // an object indicating which group values are expanded

  var _useGroupState = useGroupState(groups, groupBy),
      groupState = _useGroupState[0],
      setGroupState = _useGroupState[1];

  var _useState6 = useState(select || onSelect && [] || undefined),
      selected = _useState6[0],
      setSelected = _useState6[1];

  useEffect(function () {
    return setSelected(select || onSelect && [] || undefined);
  }, [onSelect, select]);

  var _useState7 = useState([]),
      rowExpand = _useState7[0],
      setRowExpand = _useState7[1]; // any customized column widths


  var _useState8 = useState({}),
      widths = _useState8[0],
      setWidths = _useState8[1]; // placeholder placement stuff


  var headerRef = useRef();
  var bodyRef = useRef();
  var footerRef = useRef();

  var _useState9 = useState(),
      headerHeight = _useState9[0],
      setHeaderHeight = _useState9[1];

  var _useState10 = useState(),
      footerHeight = _useState10[0],
      setFooterHeight = _useState10[1]; // offset compensation when body overflows


  var _useState11 = useState(0),
      scrollOffset = _useState11[0],
      setScrollOffset = _useState11[1]; // multiple pinned columns offset


  var _useState12 = useState(),
      pinnedOffset = _useState12[0],
      setPinnedOffset = _useState12[1];

  var onHeaderWidths = useCallback(function (columnWidths) {
    var pinnedProperties = columns.map(function (pinnedColumn) {
      return pinnedColumn.pin && pinnedColumn.property;
    }).filter(function (n) {
      return n;
    });
    var nextPinnedOffset = {};

    if (columnWidths !== []) {
      pinnedProperties.forEach(function (property, index) {
        var hasSelectColumn = Boolean(select || onSelect);
        var columnIndex = columns.findIndex(function (column) {
          return column.property === property;
        }) + hasSelectColumn;

        if (columnWidths[columnIndex]) {
          nextPinnedOffset[property] = {
            width: columnWidths[columnIndex],
            left: index === 0 ? 0 : nextPinnedOffset[pinnedProperties[index - 1]].left + nextPinnedOffset[pinnedProperties[index - 1]].width
          };
        }
      });
      setPinnedOffset(nextPinnedOffset);
    }
  }, [columns, setPinnedOffset, select, onSelect]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useLayoutEffect(function () {
    var _bodyRef$current$pare;

    var nextScrollOffset = ((_bodyRef$current$pare = bodyRef.current.parentElement) == null ? void 0 : _bodyRef$current$pare.clientWidth) - bodyRef.current.clientWidth;
    if (nextScrollOffset !== scrollOffset) setScrollOffset(nextScrollOffset);
  });
  useLayoutEffect(function () {
    if (placeholder) {
      if (headerRef.current) {
        var nextHeaderHeight = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(nextHeaderHeight);
      } else setHeaderHeight(0);

      if (footerRef.current) {
        var nextFooterHeight = footerRef.current.getBoundingClientRect().height;
        setFooterHeight(nextFooterHeight);
      } else setFooterHeight(0);
    }
  }, [footerRef, headerRef, placeholder]); // remember that we are filtering on this property

  var onFiltering = function onFiltering(property) {
    return setFiltering(property);
  }; // remember the search text we should filter this property by


  var onFilter = function onFilter(property, value) {
    var nextFilters = _extends({}, filters);

    nextFilters[property] = value;
    setFilters(nextFilters); // Let caller know about search, if interested

    if (onSearch) onSearch(nextFilters);
  }; // toggle the sort direction on this property


  var onSort = function onSort(property) {
    return function () {
      var external = sort ? sort.external : false;
      var direction;
      if (!sort || property !== sort.property) direction = 'asc';else if (sort.direction === 'asc') direction = 'desc';else direction = 'asc';
      var nextSort = {
        property: property,
        direction: direction,
        external: external
      };
      setSort(nextSort);
      if (onSortProp) onSortProp(nextSort);
    };
  }; // toggle whether the group is expanded


  var onToggleGroup = function onToggleGroup(groupValue) {
    return function () {
      var nextGroupState = _extends({}, groupState);

      nextGroupState[groupValue] = _extends({}, nextGroupState[groupValue], {
        expanded: !nextGroupState[groupValue].expanded
      });
      setGroupState(nextGroupState);

      if (groupBy.onExpand) {
        var expandedKeys = Object.keys(nextGroupState).filter(function (k) {
          return nextGroupState[k].expanded;
        });
        groupBy.onExpand(expandedKeys);
      }
    };
  }; // toggle whether all groups are expanded


  var onToggleGroups = function onToggleGroups() {
    var expanded = Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0;
    var nextGroupState = {};
    Object.keys(groupState).forEach(function (k) {
      nextGroupState[k] = _extends({}, groupState[k], {
        expanded: !expanded
      });
    });
    setGroupState(nextGroupState);

    if (groupBy.onExpand) {
      var expandedKeys = Object.keys(nextGroupState).filter(function (k) {
        return nextGroupState[k].expanded;
      });
      groupBy.onExpand(expandedKeys);
    }
  }; // remember the width this property's column should be


  var onResize = useCallback(function (property, width) {
    if (widths[property] !== width) {
      var nextWidths = _extends({}, widths);

      nextWidths[property] = width;
      setWidths(nextWidths);
    }
  }, [widths]);

  if (size && resizeable) {
    console.warn('DataTable cannot combine "size" and "resizeble".');
  }

  var _usePagination = usePagination(_extends({
    data: adjustedData,
    page: normalizeShow(showProp, step),
    step: step
  }, paginate)),
      items = _usePagination[0],
      paginationProps = _usePagination[1];

  var Container = paginate ? StyledContainer : Fragment;
  var containterProps = paginate ? _extends({}, theme.dataTable.container, {
    fill: fill
  }) : undefined; // DataTable should overflow if paginating but pagination component
  // should remain in its location

  var OverflowContainer = paginate ? Box : Fragment;
  var overflowContainerProps = paginate ? {
    overflow: {
      horizontal: 'auto'
    },
    flex: false
  } : undefined; // necessary for Firefox, otherwise paginated DataTable will
  // not fill its container like it does by default on other
  // browsers like Chrome/Safari

  var paginatedDataTableProps = paginate && (fill === true || fill === 'horizontal') ? {
    style: {
      minWidth: '100%'
    }
  } : undefined;
  return /*#__PURE__*/React.createElement(Container, containterProps, /*#__PURE__*/React.createElement(OverflowContainer, overflowContainerProps, /*#__PURE__*/React.createElement(StyledDataTable, _extends({
    fillProp: !paginate ? fill : undefined
  }, paginatedDataTableProps, rest), /*#__PURE__*/React.createElement(Header, {
    ref: headerRef,
    cellProps: cellProps.header,
    columns: columns,
    data: adjustedData,
    fill: fill,
    filtering: filtering,
    filters: filters,
    groups: groups,
    groupState: groupState,
    pin: pin === true || pin === 'header',
    pinnedOffset: pinnedOffset,
    selected: selected,
    size: size,
    sort: sort,
    widths: widths,
    onFiltering: onFiltering,
    onFilter: onFilter,
    onResize: resizeable ? onResize : undefined,
    onSelect: onSelect ? function (nextSelected) {
      setSelected(nextSelected);
      if (onSelect) onSelect(nextSelected);
    } : undefined,
    onSort: sortable || sortProp || onSortProp ? onSort : undefined,
    onToggle: onToggleGroups,
    onWidths: onHeaderWidths,
    primaryProperty: primaryProperty,
    scrollOffset: scrollOffset,
    rowDetails: rowDetails
  }), groups ? /*#__PURE__*/React.createElement(GroupedBody, {
    ref: bodyRef,
    cellProps: cellProps.body,
    columns: columns,
    groupBy: groupBy.property ? groupBy.property : groupBy,
    groups: groups,
    groupState: groupState,
    pinnedOffset: pinnedOffset,
    primaryProperty: primaryProperty,
    onMore: onMore,
    onSelect: onSelect ? function (nextSelected) {
      setSelected(nextSelected);
      if (onSelect) onSelect(nextSelected);
    } : undefined,
    onToggle: onToggleGroup,
    replace: replace,
    rowProps: rowProps,
    selected: selected,
    size: size,
    step: step
  }) : /*#__PURE__*/React.createElement(Body, {
    ref: bodyRef,
    cellProps: cellProps.body,
    columns: columns,
    data: !paginate ? adjustedData : items,
    onMore: onMore,
    replace: replace,
    onClickRow: onClickRow,
    onSelect: onSelect ? function (nextSelected) {
      setSelected(nextSelected);
      if (onSelect) onSelect(nextSelected);
    } : undefined,
    pinnedCellProps: cellProps.pinned,
    pinnedOffset: pinnedOffset,
    placeholder: placeholder,
    primaryProperty: primaryProperty,
    rowProps: rowProps,
    selected: selected,
    show: !paginate ? showProp : undefined,
    size: size,
    step: step,
    rowDetails: rowDetails,
    rowExpand: rowExpand,
    setRowExpand: setRowExpand
  }), showFooter && /*#__PURE__*/React.createElement(Footer, {
    ref: footerRef,
    cellProps: cellProps.footer,
    columns: columns,
    fill: fill,
    footerValues: footerValues,
    groups: groups,
    onSelect: onSelect,
    pin: pin === true || pin === 'footer',
    pinnedOffset: pinnedOffset,
    primaryProperty: primaryProperty,
    scrollOffset: scrollOffset,
    selected: selected,
    size: size
  }), placeholder && /*#__PURE__*/React.createElement(StyledPlaceholder, {
    top: headerHeight,
    bottom: footerHeight
  }, typeof placeholder === 'string' ? /*#__PURE__*/React.createElement(Box, {
    background: {
      color: 'background-front',
      opacity: 'strong'
    },
    align: "center",
    justify: "center",
    fill: "vertical"
  }, /*#__PURE__*/React.createElement(Text, null, placeholder)) : placeholder))), paginate && data.length > step && items && items.length ? /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
};

DataTable.propTypes = DataTablePropTypes;
export { DataTable };