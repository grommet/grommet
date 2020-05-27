"use strict";

exports.__esModule = true;
exports.DataTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Header = require("./Header");

var _Footer = require("./Footer");

var _Body = require("./Body");

var _GroupedBody = require("./GroupedBody");

var _buildState = require("./buildState");

var _StyledDataTable = require("./StyledDataTable");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var contexts = ['header', 'body', 'footer'];

var normalizeProp = function normalizeProp(prop, context) {
  if (prop) {
    if (prop[context]) return prop[context];
    if (contexts.some(function (c) {
      return prop[c];
    })) return undefined;
    return prop;
  }

  return undefined;
};

var DataTable = function DataTable(_ref) {
  var background = _ref.background,
      border = _ref.border,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? [] : _ref$columns,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      groupBy = _ref.groupBy,
      onClickRow = _ref.onClickRow,
      onMore = _ref.onMore,
      onSearch = _ref.onSearch,
      onSortProp = _ref.onSort,
      replace = _ref.replace,
      pad = _ref.pad,
      primaryKey = _ref.primaryKey,
      resizeable = _ref.resizeable,
      rowProps = _ref.rowProps,
      size = _ref.size,
      sortProp = _ref.sort,
      sortable = _ref.sortable,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 50 : _ref$step,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "data", "groupBy", "onClickRow", "onMore", "onSearch", "onSort", "replace", "pad", "primaryKey", "resizeable", "rowProps", "size", "sort", "sortable", "step"]);

  // property name of the primary property
  var primaryProperty = (0, _react.useMemo)(function () {
    return (0, _buildState.normalizePrimaryProperty)(columns, primaryKey);
  }, [columns, primaryKey]); // whether or not we should show a footer

  var showFooter = (0, _react.useMemo)(function () {
    return columns.filter(function (c) {
      return c.footer;
    }).length > 0;
  }, [columns]); // what column we are actively capturing filter input on

  var _useState = (0, _react.useState)(),
      filtering = _useState[0],
      setFiltering = _useState[1]; // the currently active filters


  var _useState2 = (0, _react.useState)((0, _buildState.initializeFilters)(columns)),
      filters = _useState2[0],
      setFilters = _useState2[1]; // which column we are sorting on, with direction


  var _useState3 = (0, _react.useState)(sortProp || {}),
      sort = _useState3[0],
      setSort = _useState3[1]; // the data filtered and sorted, if needed


  var adjustedData = (0, _react.useMemo)(function () {
    return (0, _buildState.filterAndSortData)(data, filters, onSearch, sort);
  }, [data, filters, onSearch, sort]); // the values to put in the footer cells

  var footerValues = (0, _react.useMemo)(function () {
    return (0, _buildState.buildFooterValues)(columns, adjustedData);
  }, [adjustedData, columns]); // if groupBy, an array with one item per unique groupBy key value

  var groups = (0, _react.useMemo)(function () {
    return (0, _buildState.buildGroups)(columns, adjustedData, groupBy);
  }, [adjustedData, columns, groupBy]); // an object indicating which group values are expanded

  var _useState4 = (0, _react.useState)((0, _buildState.buildGroupState)(groups, groupBy)),
      groupState = _useState4[0],
      setGroupState = _useState4[1]; // any customized column widths


  var _useState5 = (0, _react.useState)({}),
      widths = _useState5[0],
      setWidths = _useState5[1]; // remember that we are filtering on this property


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
      var direction;
      if (!sort || property !== sort.property) direction = 'asc';else if (sort.direction === 'asc') direction = 'desc';else direction = 'asc';
      var nextSort = {
        property: property,
        direction: direction
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


  var onResize = (0, _react.useCallback)(function (property, width) {
    if (widths[property] !== width) {
      var nextWidths = _extends({}, widths);

      nextWidths[property] = width;
      setWidths(nextWidths);
    }
  }, [widths]);

  if (size && resizeable) {
    console.warn('DataTable cannot combine "size" and "resizeble".');
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTable, rest, /*#__PURE__*/_react["default"].createElement(_Header.Header, {
    background: normalizeProp(background, 'header'),
    border: normalizeProp(border, 'header'),
    columns: columns,
    filtering: filtering,
    filters: filters,
    groups: groups,
    groupState: groupState,
    pad: normalizeProp(pad, 'header'),
    size: size,
    sort: sort,
    widths: widths,
    onFiltering: onFiltering,
    onFilter: onFilter,
    onResize: resizeable ? onResize : undefined,
    onSort: sortable || sortProp || onSortProp ? onSort : undefined,
    onToggle: onToggleGroups
  }), groups ? /*#__PURE__*/_react["default"].createElement(_GroupedBody.GroupedBody, {
    background: normalizeProp(background, 'body'),
    border: normalizeProp(border, 'body'),
    columns: columns,
    groupBy: groupBy.property ? groupBy.property : groupBy,
    groups: groups,
    groupState: groupState,
    pad: normalizeProp(pad, 'body'),
    primaryProperty: primaryProperty,
    onToggle: onToggleGroup,
    size: size
  }) : /*#__PURE__*/_react["default"].createElement(_Body.Body, {
    background: normalizeProp(background, 'body'),
    border: normalizeProp(border, 'body'),
    columns: columns,
    data: adjustedData,
    onMore: onMore,
    replace: replace,
    onClickRow: onClickRow,
    pad: normalizeProp(pad, 'body'),
    primaryProperty: primaryProperty,
    rowProps: rowProps,
    size: size,
    step: step
  }), showFooter && /*#__PURE__*/_react["default"].createElement(_Footer.Footer, {
    background: normalizeProp(background, 'footer'),
    border: normalizeProp(border, 'footer'),
    columns: columns,
    footerValues: footerValues,
    groups: groups,
    pad: normalizeProp(pad, 'footer'),
    primaryProperty: primaryProperty,
    size: size
  }));
};

var DataTableDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataTableDoc = require('./doc').doc(DataTable);
}

var DataTableWrapper = DataTableDoc || DataTable;
exports.DataTable = DataTableWrapper;