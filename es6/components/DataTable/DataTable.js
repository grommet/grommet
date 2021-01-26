function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import { buildFooterValues, buildGroups, buildGroupState, filterAndSortData, initializeFilters, normalizePrimaryProperty } from './buildState';
import { StyledDataTable, StyledPlaceholder } from './StyledDataTable';
var contexts = ['header', 'body', 'footer'];

var normalizeProp = function normalizeProp(prop, context) {
  if (prop) {
    if (prop[context]) {
      return prop[context];
    } // if prop[context] wasn't defined, but other values
    // exist on the prop, return undefined so that background
    // for context will defaultto theme values instead
    // note: need to include `pinned` since it is not a
    // defined context


    if (contexts.some(function (c) {
      return prop[c] || prop.pinned;
    })) {
      return undefined;
    }

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
      fill = _ref.fill,
      groupBy = _ref.groupBy,
      onClickRow = _ref.onClickRow,
      onMore = _ref.onMore,
      onSearch = _ref.onSearch,
      onSelect = _ref.onSelect,
      onSortProp = _ref.onSort,
      replace = _ref.replace,
      pad = _ref.pad,
      pin = _ref.pin,
      placeholder = _ref.placeholder,
      primaryKey = _ref.primaryKey,
      resizeable = _ref.resizeable,
      rowProps = _ref.rowProps,
      select = _ref.select,
      size = _ref.size,
      sortProp = _ref.sort,
      sortable = _ref.sortable,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 50 : _ref$step,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "data", "fill", "groupBy", "onClickRow", "onMore", "onSearch", "onSelect", "onSort", "replace", "pad", "pin", "placeholder", "primaryKey", "resizeable", "rowProps", "select", "size", "sort", "sortable", "step"]);

  // property name of the primary property
  var primaryProperty = useMemo(function () {
    return normalizePrimaryProperty(columns, primaryKey);
  }, [columns, primaryKey]); // whether or not we should show a footer

  var showFooter = useMemo(function () {
    return columns.filter(function (c) {
      return c.footer;
    }).length > 0;
  }, [columns]); // what column we are actively capturing filter input on

  var _useState = useState(),
      filtering = _useState[0],
      setFiltering = _useState[1]; // the currently active filters


  var _useState2 = useState(initializeFilters(columns)),
      filters = _useState2[0],
      setFilters = _useState2[1]; // which column we are sorting on, with direction


  var _useState3 = useState(sortProp || {}),
      sort = _useState3[0],
      setSort = _useState3[1]; // the data filtered and sorted, if needed


  var adjustedData = useMemo(function () {
    return filterAndSortData(data, filters, onSearch, sort);
  }, [data, filters, onSearch, sort]); // the values to put in the footer cells

  var footerValues = useMemo(function () {
    return buildFooterValues(columns, adjustedData);
  }, [adjustedData, columns]); // if groupBy, an array with one item per unique groupBy key value

  var groups = useMemo(function () {
    return buildGroups(columns, adjustedData, groupBy);
  }, [adjustedData, columns, groupBy]); // an object indicating which group values are expanded

  var _useState4 = useState(buildGroupState(groups, groupBy)),
      groupState = _useState4[0],
      setGroupState = _useState4[1];

  var _useState5 = useState(select || onSelect && [] || undefined),
      selected = _useState5[0],
      setSelected = _useState5[1];

  useEffect(function () {
    return setSelected(select || onSelect && [] || undefined);
  }, [onSelect, select]); // any customized column widths

  var _useState6 = useState({}),
      widths = _useState6[0],
      setWidths = _useState6[1]; // placeholder placement stuff


  var headerRef = useRef();
  var bodyRef = useRef();
  var footerRef = useRef();

  var _useState7 = useState(),
      headerHeight = _useState7[0],
      setHeaderHeight = _useState7[1];

  var _useState8 = useState(),
      footerHeight = _useState8[0],
      setFooterHeight = _useState8[1]; // offset compensation when body overflows


  var _useState9 = useState(0),
      scrollOffset = _useState9[0],
      setScrollOffset = _useState9[1]; // eslint-disable-next-line react-hooks/exhaustive-deps


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

  return /*#__PURE__*/React.createElement(StyledDataTable, _extends({
    fillProp: fill
  }, rest), /*#__PURE__*/React.createElement(Header, {
    ref: headerRef,
    background: normalizeProp(background, 'header'),
    border: normalizeProp(border, 'header'),
    columns: columns,
    data: adjustedData,
    fill: fill,
    filtering: filtering,
    filters: filters,
    groups: groups,
    groupState: groupState,
    pad: normalizeProp(pad, 'header'),
    pin: pin === true || pin === 'header',
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
    primaryProperty: primaryProperty,
    scrollOffset: scrollOffset
  }), groups ? /*#__PURE__*/React.createElement(GroupedBody, {
    ref: bodyRef,
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
  }) : /*#__PURE__*/React.createElement(Body, {
    ref: bodyRef,
    background: normalizeProp(background, 'body'),
    border: normalizeProp(border, 'body'),
    columns: columns,
    data: adjustedData,
    onMore: onMore,
    replace: replace,
    onClickRow: onClickRow,
    onSelect: onSelect ? function (nextSelected) {
      setSelected(nextSelected);
      if (onSelect) onSelect(nextSelected);
    } : undefined,
    pad: normalizeProp(pad, 'body'),
    pinnedBackground: normalizeProp(background, 'pinned'),
    placeholder: placeholder,
    primaryProperty: primaryProperty,
    rowProps: rowProps,
    selected: selected,
    size: size,
    step: step
  }), showFooter && /*#__PURE__*/React.createElement(Footer, {
    ref: footerRef,
    background: normalizeProp(background, 'footer'),
    border: normalizeProp(border, 'footer'),
    columns: columns,
    fill: fill,
    footerValues: footerValues,
    groups: groups,
    onSelect: onSelect,
    pad: normalizeProp(pad, 'footer'),
    pin: pin === true || pin === 'footer',
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
  }, /*#__PURE__*/React.createElement(Text, null, placeholder)) : placeholder));
};

var DataTableDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataTableDoc = require('./doc').doc(DataTable);
}

var DataTableWrapper = DataTableDoc || DataTable;
export { DataTableWrapper as DataTable };