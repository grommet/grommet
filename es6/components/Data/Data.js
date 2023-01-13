var _excluded = ["children", "data", "defaultView", "filteredTotal", "id", "messages", "onView", "properties", "toolbar", "total", "updateOn", "view"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '../Box';
import { DataFilters } from '../DataFilters';
import { DataSearch } from '../DataSearch';
import { DataSummary } from '../DataSummary';
import { Toolbar } from '../Toolbar';
import { DataContext } from '../../contexts/DataContext';
import { DataPropTypes } from './propTypes';
import { filter } from './filter';
var defaultDefaultView = {
  search: ''
};
export var Data = function Data(_ref) {
  var children = _ref.children,
    dataProp = _ref.data,
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
    _ref$updateOn = _ref.updateOn,
    updateOn = _ref$updateOn === void 0 ? 'submit' : _ref$updateOn,
    viewProp = _ref.view,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState(viewProp || defaultView),
    view = _useState[0],
    setView = _useState[1];
  useEffect(function () {
    return setView(viewProp);
  }, [viewProp]);
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

  // what we use for DataContext value
  var contextValue = useMemo(function () {
    var value = _extends({
      id: id,
      messages: messages,
      properties: properties,
      updateOn: updateOn,
      view: view
    }, result);
    value.clearFilters = function () {
      var nextView = defaultView;
      setView(nextView);
      if (onView) onView(nextView);
    };
    value.onView = function (nextView) {
      setView(nextView);
      if (onView) onView(nextView);
    };
    return value;
  }, [defaultView, id, messages, onView, properties, result, updateOn, view]);
  var toolbarContent;
  if (toolbar) {
    toolbarContent = [/*#__PURE__*/React.createElement(Toolbar, {
      key: "toolbar"
    }, (toolbar === true || toolbar === 'search') && /*#__PURE__*/React.createElement(DataSearch, null), (toolbar === true || toolbar === 'filters') && /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
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