var _excluded = ["allowSelectAll", "background", "border", "columns", "data", "disabled", "fill", "groupBy", "onClickRow", "onMore", "onSearch", "onSelect", "onSort", "onUpdate", "replace", "pad", "paginate", "pin", "placeholder", "primaryKey", "resizeable", "rowProps", "select", "show", "size", "sort", "sortable", "rowDetails", "step", "verticalAlign"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, Fragment } from 'react';
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
import { buildFooterValues, buildGroups, buildGroupState, filterAndSortData, initializeFilters, normalizeCellProps, normalizePrimaryProperty } from './buildState';
import { normalizeShow, usePagination } from '../../utils';
import { StyledContainer, StyledDataTable, StyledPlaceholder } from './StyledDataTable';
import { DataTablePropTypes } from './propTypes';
import { PlaceholderBody } from './PlaceholderBody';
var emptyData = [];
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
  var _ref$allowSelectAll = _ref.allowSelectAll,
    allowSelectAll = _ref$allowSelectAll === void 0 ? true : _ref$allowSelectAll,
    background = _ref.background,
    border = _ref.border,
    columnsProp = _ref.columns,
    dataProp = _ref.data,
    disabled = _ref.disabled,
    fill = _ref.fill,
    groupByProp = _ref.groupBy,
    onClickRow = _ref.onClickRow,
    onMore = _ref.onMore,
    onSearch = _ref.onSearch,
    onSelect = _ref.onSelect,
    onSortProp = _ref.onSort,
    onUpdate = _ref.onUpdate,
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
    verticalAlign = _ref.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useContext = useContext(DataContext),
    view = _useContext.view,
    contextData = _useContext.data,
    properties = _useContext.properties,
    onView = _useContext.onView;
  var data = dataProp || contextData || emptyData;
  var columns = useMemo(function () {
    var result = [];
    if (columnsProp) result = columnsProp;else if (properties) result = Object.keys(properties).map(function (p) {
      return _extends({
        property: p
      }, properties[p]);
    });else if (data.length) result = Object.keys(data[0]).map(function (p) {
      return {
        property: p
      };
    });
    if (view != null && view.columns) result = result.filter(function (c) {
      return view.columns.includes(c.property);
    }).sort(function (c1, c2) {
      return view.columns.indexOf(c1.property) - view.columns.indexOf(c2.property);
    });
    return result;
  }, [columnsProp, data, properties, view]);

  // property name of the primary property
  var primaryProperty = useMemo(function () {
    return normalizePrimaryProperty(columns, primaryKey);
  }, [columns, primaryKey]);

  // whether or not we should show a footer
  var showFooter = useMemo(function () {
    return columns.filter(function (c) {
      return c.footer;
    }).length > 0;
  }, [columns]);

  // what column we are actively capturing filter input on
  var _useState3 = useState(),
    filtering = _useState3[0],
    setFiltering = _useState3[1];

  // the currently active filters
  var _useState4 = useState(initializeFilters(columns)),
    filters = _useState4[0],
    setFilters = _useState4[1];

  // which column we are sorting on, with direction
  var _useState5 = useState(sortProp || {}),
    sort = _useState5[0],
    setSort = _useState5[1];
  useEffect(function () {
    if (sortProp) setSort(sortProp);else if (view != null && view.sort) setSort(view.sort);
  }, [sortProp, view]);

  // what we are grouping on
  var groupBy = (view == null ? void 0 : view.groupBy) || groupByProp;

  // the data filtered and sorted, if needed
  // Note: onUpdate mode expects the data to be passed
  //   in completely filtered and sorted already.
  var adjustedData = useMemo(function () {
    return onUpdate ? data : filterAndSortData(data, filters, onSearch, sort);
  }, [data, filters, onSearch, onUpdate, sort]);

  // the values to put in the footer cells
  var footerValues = useMemo(function () {
    return buildFooterValues(columns, adjustedData);
  }, [adjustedData, columns]);

  // cell styling properties: background, border, pad
  var cellProps = useMemo(function () {
    return normalizeCellProps({
      background: background,
      border: border,
      pad: pad,
      pin: pin
    }, theme);
  }, [background, border, pad, pin, theme]);

  // if groupBy, an array with one item per unique groupBy key value
  var groups = useMemo(function () {
    return buildGroups(columns, adjustedData, groupBy, primaryProperty);
  }, [adjustedData, columns, groupBy, primaryProperty]);

  // an object indicating which group values are expanded
  var _useGroupState = useGroupState(groups, groupBy),
    groupState = _useGroupState[0],
    setGroupState = _useGroupState[1];
  var _useState6 = useState(step),
    limit = _useState6[0],
    setLimit = _useState6[1];
  var _useState7 = useState(select || onSelect && [] || undefined),
    selected = _useState7[0],
    setSelected = _useState7[1];
  useEffect(function () {
    return setSelected(select || onSelect && [] || undefined);
  }, [onSelect, select]);
  var _useState8 = useState([]),
    rowExpand = _useState8[0],
    setRowExpand = _useState8[1];

  // any customized column widths
  var _useState9 = useState({}),
    widths = _useState9[0],
    setWidths = _useState9[1];

  // placeholder placement stuff
  var headerRef = useRef();
  var bodyRef = useRef();
  var footerRef = useRef();
  var _useState10 = useState(),
    headerHeight = _useState10[0],
    setHeaderHeight = _useState10[1];
  var _useState11 = useState(),
    footerHeight = _useState11[0],
    setFooterHeight = _useState11[1];

  // offset compensation when body overflows
  var _useState12 = useState(0),
    scrollOffset = _useState12[0],
    setScrollOffset = _useState12[1];

  // multiple pinned columns offset
  var _useState13 = useState(),
    pinnedOffset = _useState13[0],
    setPinnedOffset = _useState13[1];
  var onHeaderWidths = useCallback(function (columnWidths) {
    var hasSelectColumn = Boolean(select || onSelect);
    var pinnedProperties = columns.map(function (pinnedColumn) {
      return pinnedColumn.pin && pinnedColumn.property;
    }).filter(function (n) {
      return n;
    });
    if (hasSelectColumn && pinnedProperties.length > 0) {
      pinnedProperties = ['_grommetDataTableSelect'].concat(pinnedProperties);
    }
    var nextPinnedOffset = {};
    if (columnWidths !== []) {
      pinnedProperties.forEach(function (property, index) {
        var columnIndex = property === '_grommetDataTableSelect' ? 0 : columns.findIndex(function (column) {
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
  }, [columns, setPinnedOffset, select, onSelect]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(function () {
    var _bodyRef$current$pare;
    var nextScrollOffset = (((_bodyRef$current$pare = bodyRef.current.parentElement) == null ? void 0 : _bodyRef$current$pare.clientWidth) || 0) - bodyRef.current.clientWidth;
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
  }, [footerRef, headerRef, placeholder]);

  // remember that we are filtering on this property
  var onFiltering = function onFiltering(property) {
    return setFiltering(property);
  };

  // remember the search text we should filter this property by
  var onFilter = function onFilter(property, value) {
    var nextFilters = _extends({}, filters);
    nextFilters[property] = value;
    setFilters(nextFilters);
    // Let caller know about search, if interested
    if (onSearch) onSearch(nextFilters);
  };

  // toggle the sort direction on this property
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
      if (onView) {
        onView(_extends({}, view, {
          sort: {
            property: property,
            direction: direction
          }
        }));
      }
      if (onUpdate) {
        var opts = {
          count: limit,
          sort: nextSort
        };
        if (groups) {
          opts.expanded = Object.keys(groupState).filter(function (k) {
            return groupState[k].expanded;
          });
        }
        if (showProp) opts.show = showProp;
        onUpdate(opts);
      }
      if (onSortProp) onSortProp(nextSort);
    };
  };

  // toggle whether the group is expanded
  var onToggleGroup = function onToggleGroup(groupValue) {
    return function () {
      var nextGroupState = _extends({}, groupState);
      nextGroupState[groupValue] = _extends({}, nextGroupState[groupValue], {
        expanded: !nextGroupState[groupValue].expanded
      });
      setGroupState(nextGroupState);
      var expandedKeys = Object.keys(nextGroupState).filter(function (k) {
        return nextGroupState[k].expanded;
      });
      if (onUpdate) {
        var opts = {
          expanded: expandedKeys,
          count: limit
        };
        if (sort != null && sort.property) opts.sort = sort;
        if (showProp) opts.show = showProp;
        onUpdate(opts);
      }
      if (groupBy.onExpand) {
        groupBy.onExpand(expandedKeys);
      }
    };
  };

  // toggle whether all groups are expanded
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
    var expandedKeys = Object.keys(nextGroupState).filter(function (k) {
      return nextGroupState[k].expanded;
    });
    if (onUpdate) {
      var opts = {
        expanded: expandedKeys,
        count: limit
      };
      if (showProp) opts.show = showProp;
      if (sort != null && sort.property) opts.sort = sort;
      onUpdate(opts);
    }
    if (groupBy.onExpand) {
      groupBy.onExpand(expandedKeys);
    }
  };

  // remember the width this property's column should be
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
  if (onUpdate && onMore) {
    console.warn('DataTable cannot combine "onUpdate" and "onMore".');
  }
  var _usePagination = usePagination(_extends({
      data: adjustedData,
      page: normalizeShow(showProp, step),
      step: step
    }, paginate)),
    items = _usePagination[0],
    paginationProps = _usePagination[1];
  var paginationStep = paginationProps.step;
  var Container = paginate ? StyledContainer : Fragment;
  var containterProps = paginate ? _extends({}, theme.dataTable.container, {
    fill: fill
  }) : undefined;

  // DataTable should overflow if paginating but pagination component
  // should remain in its location
  var OverflowContainer = paginate ? Box : Fragment;
  var overflowContainerProps = paginate ? {
    overflow: {
      horizontal: 'auto'
    }
  } : undefined;

  // necessary for Firefox, otherwise paginated DataTable will
  // not fill its container like it does by default on other
  // browsers like Chrome/Safari
  var paginatedDataTableProps = paginate && (fill === true || fill === 'horizontal') ? {
    style: {
      minWidth: '100%'
    }
  } : undefined;
  var placeholderContent = placeholder;
  if (placeholder && typeof placeholder === 'string') {
    placeholderContent = /*#__PURE__*/React.createElement(Box, {
      background: {
        color: 'background-front',
        opacity: 'strong'
      },
      align: "center",
      justify: "center",
      fill: "vertical"
    }, /*#__PURE__*/React.createElement(Text, null, placeholder));
  }
  var bodyContent = groups ? /*#__PURE__*/React.createElement(GroupedBody, {
    ref: bodyRef,
    cellProps: cellProps.body,
    columns: columns,
    disabled: disabled,
    groupBy: typeof groupBy === 'string' ? {
      property: groupBy
    } : groupBy,
    groups: groups,
    groupState: groupState,
    pinnedOffset: pinnedOffset,
    primaryProperty: primaryProperty,
    onMore: onUpdate ? function () {
      if (adjustedData.length === limit) {
        var opts = {
          expanded: Object.keys(groupState).filter(function (k) {
            return groupState[k].expanded;
          }),
          count: limit + paginationStep
        };
        if (sort != null && sort.property) opts.sort = sort;
        if (showProp) opts.show = showProp;
        onUpdate(opts);
        setLimit(function (prev) {
          return prev + paginationStep;
        });
      }
    } : onMore,
    onSelect: onSelect ? function (nextSelected, row) {
      setSelected(nextSelected);
      if (onSelect) onSelect(nextSelected, row);
    } : undefined,
    onToggle: onToggleGroup,
    onUpdate: onUpdate,
    replace: replace,
    rowProps: rowProps,
    selected: selected,
    size: size,
    step: paginationStep,
    verticalAlign: typeof verticalAlign === 'string' ? verticalAlign : verticalAlign == null ? void 0 : verticalAlign.body
  }) : /*#__PURE__*/React.createElement(Body, {
    ref: bodyRef,
    cellProps: cellProps.body,
    columns: columns,
    data: !paginate ? adjustedData : items,
    disabled: disabled,
    onMore: onUpdate ? function () {
      if (adjustedData.length === limit) {
        var opts = {
          count: limit + paginationStep
        };
        if (sort != null && sort.property) opts.sort = sort;
        if (showProp) opts.show = showProp;
        onUpdate(opts);
        setLimit(function (prev) {
          return prev + paginationStep;
        });
      }
    } : onMore,
    replace: replace,
    onClickRow: onClickRow,
    onSelect: onSelect ? function (nextSelected, row) {
      setSelected(nextSelected);
      if (onSelect) onSelect(nextSelected, row);
    } : undefined,
    pinnedCellProps: cellProps.pinned,
    pinnedOffset: pinnedOffset,
    primaryProperty: primaryProperty,
    rowProps: rowProps,
    selected: selected,
    show: !paginate ? showProp : undefined,
    size: size,
    step: paginationStep,
    rowDetails: rowDetails,
    rowExpand: rowExpand,
    setRowExpand: setRowExpand,
    verticalAlign: typeof verticalAlign === 'string' ? verticalAlign : verticalAlign == null ? void 0 : verticalAlign.body
  });
  return /*#__PURE__*/React.createElement(Container, containterProps, /*#__PURE__*/React.createElement(OverflowContainer, overflowContainerProps, /*#__PURE__*/React.createElement(StyledDataTable, _extends({
    fillProp: !paginate ? fill : undefined
  }, paginatedDataTableProps, rest), /*#__PURE__*/React.createElement(Header, {
    ref: headerRef,
    allowSelectAll: allowSelectAll,
    cellProps: cellProps.header,
    columns: columns,
    data: adjustedData,
    disabled: disabled,
    fill: fill,
    filtering: filtering,
    filters: filters,
    groupBy: groupBy,
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
    rowDetails: rowDetails,
    verticalAlign: typeof verticalAlign === 'string' ? verticalAlign : verticalAlign == null ? void 0 : verticalAlign.header
  }), placeholder && (!items || items.length === 0) ? /*#__PURE__*/React.createElement(PlaceholderBody, {
    ref: bodyRef,
    columns: columns,
    onSelect: onSelect
  }, placeholderContent) : bodyContent, showFooter && /*#__PURE__*/React.createElement(Footer, {
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
    size: size,
    verticalAlign: typeof verticalAlign === 'string' ? verticalAlign : verticalAlign == null ? void 0 : verticalAlign.footer
  }), placeholder && items && items.length > 0 && /*#__PURE__*/React.createElement(StyledPlaceholder, {
    top: headerHeight,
    bottom: footerHeight
  }, placeholderContent))), paginate && adjustedData.length > paginationStep && items && items.length ? /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
};
DataTable.propTypes = DataTablePropTypes;
export { DataTable };