var _excluded = ["children", "data", "defaultView", "filteredTotal", "id", "messages", "onView", "properties", "toolbar", "total", "view", "views"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AnnounceContext } from '../../contexts';
import { Box } from '../Box';
import { DataFilters } from '../DataFilters';
import { DataSearch } from '../DataSearch';
import { DataSummary } from '../DataSummary';
import { DataView } from '../DataView';
import { Toolbar } from '../Toolbar';
import { DataContext } from '../../contexts/DataContext';
import { DataPropTypes } from './propTypes';
import { MessageContext } from '../../contexts/MessageContext';
import { filter } from './filter';
var defaultDefaultView = {
  search: ''
};
var normalizeView = function normalizeView(viewProp, views) {
  return typeof viewProp === 'string' && (views == null ? void 0 : views.find(function (v) {
    return v.name === viewProp;
  })) || typeof viewProp === 'object' && viewProp;
};
export var Data = function Data(_ref) {
  var children = _ref.children,
    _ref$data = _ref.data,
    dataProp = _ref$data === void 0 ? [] : _ref$data,
    _ref$defaultView = _ref.defaultView,
    defaultView = _ref$defaultView === void 0 ? defaultDefaultView : _ref$defaultView,
    filteredTotal = _ref.filteredTotal,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? 'data' : _ref$id,
    messages = _ref.messages,
    onView = _ref.onView,
    properties = _ref.properties,
    toolbar = _ref.toolbar,
    total = _ref.total,
    viewProp = _ref.view,
    views = _ref.views,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState(normalizeView(viewProp || defaultView, views)),
    view = _useState[0],
    setView = _useState[1];
  useEffect(function () {
    return setView(normalizeView(viewProp || defaultView, views));
  }, [defaultView, viewProp, views]);
  var _useState2 = useState([]),
    toolbarKeys = _useState2[0],
    setToolbarKeys = _useState2[1];
  var result = useMemo(function () {
    var _ref2;
    if (onView)
      // caller is filtering
      return {
        data: dataProp,
        total: total,
        filteredTotal: (_ref2 = filteredTotal != null ? filteredTotal : dataProp == null ? void 0 : dataProp.length) != null ? _ref2 : 0
      };
    return filter(dataProp, view, properties);
  }, [dataProp, filteredTotal, onView, properties, total, view]);

  // used by DataFilters to determine if badge should appear on Filter button
  var _useState3 = useState(true),
    filtersCleared = _useState3[0],
    setFiltersCleared = _useState3[1];
  var announce = useContext(AnnounceContext);
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  // Announce to screen readers when search or filters are
  // applied and affect the underlying result set
  useEffect(function () {
    var messageId;
    if (result.total !== result.filteredTotal) {
      if (result.filteredTotal === 1) messageId = 'dataSummary.filteredSingle';else messageId = 'dataSummary.filtered';
    } else if (result.total === 1) messageId = 'dataSummary.totalSingle';else messageId = 'dataSummary.total';

    // helps account for cases like 0 results of 1 item
    var items = format({
      id: result.total === 1 ? 'dataSummary.itemsSingle' : 'dataSummary.items',
      messages: messages == null ? void 0 : messages.dataSummary
    });
    announce(format({
      id: messageId,
      messages: messages == null ? void 0 : messages.dataSummary,
      values: {
        filteredTotal: result.filteredTotal,
        total: result.total,
        items: items
      }
    }));
  }, [announce, format, messages == null ? void 0 : messages.dataSummary, result.filteredTotal, result.total]);

  // what we use for DataContext value
  var contextValue = useMemo(function () {
    var value = _extends({
      id: id,
      messages: messages,
      properties: properties,
      filtersCleared: filtersCleared,
      setFiltersCleared: setFiltersCleared,
      view: view,
      views: views
    }, result);
    value.clearFilters = function () {
      var nextView = defaultView;
      setFiltersCleared(true);
      setView(nextView);
      if (onView) onView(nextView);
    };
    value.onView = function (nextView) {
      setView(nextView);
      if (onView) onView(nextView);
    };
    value.addToolbarKey = function (key) {
      setToolbarKeys(function (prevKeys) {
        if (prevKeys.includes(key)) return prevKeys;
        return [].concat(prevKeys, [key]);
      });
    };
    value.toolbarKeys = toolbarKeys;
    return value;
  }, [defaultView, id, messages, filtersCleared, onView, properties, result, toolbarKeys, view, views]);
  var toolbarContent;
  if (toolbar) {
    toolbarContent = [/*#__PURE__*/React.createElement(Toolbar, {
      key: "toolbar"
    }, (toolbar === true || toolbar === 'search') && /*#__PURE__*/React.createElement(DataSearch, null), (toolbar === true || toolbar === 'view') && /*#__PURE__*/React.createElement(DataView, null), (toolbar === true || toolbar === 'filters') && /*#__PURE__*/React.createElement(DataFilters, {
      layer: true
    })), /*#__PURE__*/React.createElement(DataSummary, {
      key: "summary"
    })];
  }
  return /*#__PURE__*/React.createElement(DataContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Box, _extends({
    id: id,
    flex: false
  }, rest), toolbarContent, children));
};
Data.propTypes = DataPropTypes;