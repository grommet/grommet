"use strict";

exports.__esModule = true;
exports.DataTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _Box = require("../Box");
var _Text = require("../Text");
var _Header = require("./Header");
var _Footer = require("./Footer");
var _Body = require("./Body");
var _GroupedBody = require("./GroupedBody");
var _Pagination = require("../Pagination");
var _buildState = require("./buildState");
var _utils = require("../../utils");
var _StyledDataTable = require("./StyledDataTable");
var _propTypes = require("./propTypes");
var _PlaceholderBody = require("./PlaceholderBody");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["allowSelectAll", "background", "border", "columns", "data", "disabled", "fill", "groupBy", "messages", "onClickRow", "onMore", "onSearch", "onSelect", "onSort", "onUpdate", "replace", "pad", "paginate", "pin", "placeholder", "primaryKey", "resizeable", "rowProps", "select", "show", "size", "sort", "sortable", "rowDetails", "step", "verticalAlign"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var emptyData = [];
function useGroupState(groups, groupBy) {
  var _useState = (0, _react.useState)(function () {
      return (0, _buildState.buildGroupState)(groups, groupBy);
    }),
    groupState = _useState[0],
    setGroupState = _useState[1];
  var _useState2 = (0, _react.useState)({
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
    var nextGroupState = (0, _buildState.buildGroupState)(groups, groupBy);
    setGroupState(nextGroupState);
    return [nextGroupState, setGroupState];
  }
  return [groupState, setGroupState];
}
var DataTable = exports.DataTable = function DataTable(_ref) {
  var _ref$allowSelectAll = _ref.allowSelectAll,
    allowSelectAll = _ref$allowSelectAll === void 0 ? true : _ref$allowSelectAll,
    background = _ref.background,
    border = _ref.border,
    columnsProp = _ref.columns,
    dataProp = _ref.data,
    disabled = _ref.disabled,
    fill = _ref.fill,
    groupByProp = _ref.groupBy,
    messages = _ref.messages,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    view = _useContext.view,
    contextData = _useContext.data,
    properties = _useContext.properties,
    onView = _useContext.onView,
    setSelectedDataContext = _useContext.setSelected;
  var data = dataProp || contextData || emptyData;
  var columns = (0, _react.useMemo)(function () {
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
  var primaryProperty = (0, _react.useMemo)(function () {
    return (0, _buildState.normalizePrimaryProperty)(columns, primaryKey);
  }, [columns, primaryKey]);

  // whether or not we should show a footer
  var showFooter = (0, _react.useMemo)(function () {
    return columns.filter(function (c) {
      return c.footer;
    }).length > 0;
  }, [columns]);

  // what column we are actively capturing filter input on
  var _useState3 = (0, _react.useState)(),
    filtering = _useState3[0],
    setFiltering = _useState3[1];

  // the currently active filters
  var _useState4 = (0, _react.useState)((0, _buildState.initializeFilters)(columns)),
    filters = _useState4[0],
    setFilters = _useState4[1];

  // which column we are sorting on, with direction
  var _useState5 = (0, _react.useState)(sortProp || {}),
    sort = _useState5[0],
    setSort = _useState5[1];
  (0, _react.useEffect)(function () {
    if (sortProp) setSort(sortProp);else if (view != null && view.sort) setSort(view.sort);
  }, [sortProp, view]);

  // what we are grouping on
  var groupBy = (view == null ? void 0 : view.groupBy) || groupByProp;

  // the data filtered and sorted, if needed
  // Note: onUpdate mode expects the data to be passed
  //   in completely filtered and sorted already.
  var adjustedData = (0, _react.useMemo)(function () {
    return onUpdate ? data : (0, _buildState.filterAndSortData)(data, filters, onSearch, sort);
  }, [data, filters, onSearch, onUpdate, sort]);

  // the values to put in the footer cells
  var footerValues = (0, _react.useMemo)(function () {
    return (0, _buildState.buildFooterValues)(columns, adjustedData);
  }, [adjustedData, columns]);

  // cell styling properties: background, border, pad
  var cellProps = (0, _react.useMemo)(function () {
    return (0, _buildState.normalizeCellProps)({
      background: background,
      border: border,
      pad: pad,
      pin: pin
    }, theme);
  }, [background, border, pad, pin, theme]);

  // if groupBy, an array with one item per unique groupBy key value
  var groups = (0, _react.useMemo)(function () {
    return (0, _buildState.buildGroups)(columns, adjustedData, groupBy, primaryProperty);
  }, [adjustedData, columns, groupBy, primaryProperty]);

  // an object indicating which group values are expanded
  var _useGroupState = useGroupState(groups, groupBy),
    groupState = _useGroupState[0],
    setGroupState = _useGroupState[1];
  var _useState6 = (0, _react.useState)(step),
    limit = _useState6[0],
    setLimit = _useState6[1];
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  var _useContext2 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext2.format;
  // only announce number of rows that are rendered
  // when outside of DataContext, otherwise
  // Data will make this announcement
  (0, _react.useEffect)(function () {
    if (dataProp) {
      var messageId;
      var rows = format({
        id: adjustedData.length === 1 ? 'dataTable.rowsSingle' : 'dataTable.rows',
        messages: messages
      });
      // when less than one page returned, use specific amount
      if (adjustedData.length < limit) {
        if (adjustedData.length === 1) messageId = 'dataTable.totalSingle';else messageId = 'dataTable.total';
      } else {
        messageId = 'dataTable.rowsChanged';
      }
      announce(format({
        id: messageId,
        messages: messages,
        values: {
          total: adjustedData.length,
          rows: rows
        }
      }));
    }
  }, [dataProp, adjustedData, announce, format, limit, messages, paginate]);
  var _useState7 = (0, _react.useState)(select || onSelect && [] || undefined),
    selected = _useState7[0],
    setSelected = _useState7[1];
  (0, _react.useEffect)(function () {
    return setSelected(select || onSelect && [] || undefined);
  }, [onSelect, select]);
  (0, _react.useEffect)(function () {
    if (select && setSelectedDataContext) {
      setSelectedDataContext(select.length);
    }
  }, [select, setSelectedDataContext]);
  var _useState8 = (0, _react.useState)((rowDetails == null ? void 0 : rowDetails.expand) || []),
    rowExpand = _useState8[0],
    setRowExpand = _useState8[1];
  (0, _react.useEffect)(function () {
    if (rowDetails != null && rowDetails.expand) {
      setRowExpand(rowDetails.expand);
    }
  }, [rowDetails == null ? void 0 : rowDetails.expand]);

  // any customized column widths
  var _useState9 = (0, _react.useState)({}),
    widths = _useState9[0],
    setWidths = _useState9[1];

  // placeholder placement stuff
  var headerRef = (0, _react.useRef)();
  var bodyRef = (0, _react.useRef)();
  var footerRef = (0, _react.useRef)();
  var _useState0 = (0, _react.useState)(),
    headerHeight = _useState0[0],
    setHeaderHeight = _useState0[1];
  var _useState1 = (0, _react.useState)(),
    footerHeight = _useState1[0],
    setFooterHeight = _useState1[1];

  // offset compensation when body overflows
  var _useState10 = (0, _react.useState)(0),
    scrollOffset = _useState10[0],
    setScrollOffset = _useState10[1];

  // multiple pinned columns offset
  var _useState11 = (0, _react.useState)(),
    pinnedOffset = _useState11[0],
    setPinnedOffset = _useState11[1];
  var onHeaderWidths = (0, _react.useCallback)(function (columnWidths) {
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
    if (columnWidths.length !== 0) {
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
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    var _bodyRef$current$pare;
    var nextScrollOffset = (((_bodyRef$current$pare = bodyRef.current.parentElement) == null ? void 0 : _bodyRef$current$pare.clientWidth) || 0) - bodyRef.current.clientWidth;
    if (nextScrollOffset !== scrollOffset) setScrollOffset(nextScrollOffset);
  });
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
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
  var onResize = (0, _react.useCallback)(function (property, width) {
    if (widths[property] !== width) {
      var nextWidths = _extends({}, widths);
      nextWidths[property] = width;
      setWidths(nextWidths);
    }
  }, [widths]);
  if (size && resizeable) {
    console.warn('DataTable cannot combine "size" and "resizeable".');
  }
  if (onUpdate && onMore) {
    console.warn('DataTable cannot combine "onUpdate" and "onMore".');
  }
  var _usePagination = (0, _utils.usePagination)(_extends({
      data: adjustedData,
      page: (0, _utils.normalizeShow)(showProp, step),
      step: step
    }, paginate)),
    items = _usePagination[0],
    paginationProps = _usePagination[1];
  var paginationStep = paginationProps.step;
  var Container = paginate ? _StyledDataTable.StyledContainer : _react.Fragment;
  var containterProps = paginate ? _extends({}, theme.dataTable.container, {
    fill: fill
  }, passThemeFlag) : undefined;

  // DataTable should overflow if paginating but pagination component
  // should remain in its location
  var OverflowContainer = paginate ? _Box.Box : _react.Fragment;
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
    placeholderContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      background: {
        color: 'background-front',
        opacity: 'strong'
      },
      align: "center",
      justify: "center",
      fill: "vertical"
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, null, placeholder));
  }
  var handleSelect = function handleSelect(nextSelected, row) {
    setSelected(nextSelected);
    if (setSelectedDataContext) setSelectedDataContext(nextSelected.length);
    if (row) onSelect(nextSelected, row);else onSelect(nextSelected);
  };
  var bodyContent = groups ? /*#__PURE__*/_react["default"].createElement(_GroupedBody.GroupedBody, {
    ref: bodyRef,
    cellProps: {
      body: cellProps.body,
      groupHeader: _extends({}, cellProps.body, cellProps.groupHeader)
    },
    columns: columns,
    disabled: disabled,
    groupBy: typeof groupBy === 'string' ? {
      property: groupBy
    } : groupBy,
    groups: groups,
    groupState: groupState,
    messages: messages,
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
    onSelect: onSelect ? handleSelect : undefined,
    onToggle: onToggleGroup,
    onUpdate: onUpdate,
    replace: replace,
    rowProps: rowProps,
    selected: selected,
    size: size,
    step: paginationStep,
    verticalAlign: typeof verticalAlign === 'string' ? verticalAlign : verticalAlign == null ? void 0 : verticalAlign.body
  }) : /*#__PURE__*/_react["default"].createElement(_Body.Body, {
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
    onSelect: onSelect ? handleSelect : undefined,
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
  return /*#__PURE__*/_react["default"].createElement(Container, containterProps, /*#__PURE__*/_react["default"].createElement(OverflowContainer, overflowContainerProps, /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTable, _extends({
    fillProp: !paginate ? fill : undefined
  }, paginatedDataTableProps, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement(_Header.Header, {
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
    messages: messages,
    onFiltering: onFiltering,
    onFilter: onFilter,
    onResize: resizeable ? onResize : undefined,
    onSelect: onSelect ? handleSelect : undefined,
    onSort: sortable || sortProp || onSortProp ? onSort : undefined,
    onToggle: onToggleGroups,
    onWidths: onHeaderWidths,
    primaryProperty: primaryProperty,
    scrollOffset: scrollOffset,
    rowDetails: rowDetails,
    verticalAlign: typeof verticalAlign === 'string' ? verticalAlign : verticalAlign == null ? void 0 : verticalAlign.header
  }), placeholder && (!items || items.length === 0) ? /*#__PURE__*/_react["default"].createElement(_PlaceholderBody.PlaceholderBody, {
    ref: bodyRef,
    columns: columns,
    onSelect: onSelect
  }, placeholderContent) : bodyContent, showFooter && /*#__PURE__*/_react["default"].createElement(_Footer.Footer, {
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
  }), placeholder && items && items.length > 0 && /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledPlaceholder, {
    top: headerHeight,
    bottom: footerHeight
  }, placeholderContent))), paginate && adjustedData.length > paginationStep && items && items.length ? /*#__PURE__*/_react["default"].createElement(_Pagination.Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
};
DataTable.propTypes = _propTypes.DataTablePropTypes;