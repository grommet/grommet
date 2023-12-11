"use strict";

exports.__esModule = true;
exports.Data = void 0;
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _Box = require("../Box");
var _DataFilters = require("../DataFilters");
var _DataSearch = require("../DataSearch");
var _DataSummary = require("../DataSummary");
var _DataView = require("../DataView");
var _Toolbar = require("../Toolbar");
var _DataContext = require("../../contexts/DataContext");
var _propTypes = require("./propTypes");
var _MessageContext = require("../../contexts/MessageContext");
var _filter = require("./filter");
var _excluded = ["children", "data", "defaultView", "filteredTotal", "id", "messages", "onView", "properties", "toolbar", "total", "view", "views"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultDefaultView = {
  search: ''
};
var normalizeView = function normalizeView(viewProp, views) {
  return typeof viewProp === 'string' && (views == null ? void 0 : views.find(function (v) {
    return v.name === viewProp;
  })) || typeof viewProp === 'object' && viewProp;
};
var Data = exports.Data = function Data(_ref) {
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
  var _useState = (0, _react.useState)(normalizeView(viewProp || defaultView, views)),
    view = _useState[0],
    setView = _useState[1];
  (0, _react.useEffect)(function () {
    return setView(normalizeView(viewProp || defaultView, views));
  }, [defaultView, viewProp, views]);
  var _useState2 = (0, _react.useState)([]),
    toolbarKeys = _useState2[0],
    setToolbarKeys = _useState2[1];
  var result = (0, _react.useMemo)(function () {
    var _ref2;
    if (onView)
      // caller is filtering
      return {
        data: dataProp,
        total: total,
        filteredTotal: (_ref2 = filteredTotal != null ? filteredTotal : dataProp == null ? void 0 : dataProp.length) != null ? _ref2 : 0
      };
    return (0, _filter.filter)(dataProp, view, properties);
  }, [dataProp, filteredTotal, onView, properties, total, view]);

  // used by DataFilters to determine if badge should appear on Filter button
  var _useState3 = (0, _react.useState)(true),
    filtersCleared = _useState3[0],
    setFiltersCleared = _useState3[1];
  var announce = (0, _react.useContext)(_contexts.AnnounceContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  // Announce to screen readers when search or filters are
  // applied and affect the underlying result set
  (0, _react.useEffect)(function () {
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
  var contextValue = (0, _react.useMemo)(function () {
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
    toolbarContent = [/*#__PURE__*/_react["default"].createElement(_Toolbar.Toolbar, {
      key: "toolbar"
    }, (toolbar === true || toolbar === 'search') && /*#__PURE__*/_react["default"].createElement(_DataSearch.DataSearch, null), (toolbar === true || toolbar === 'view') && /*#__PURE__*/_react["default"].createElement(_DataView.DataView, null), (toolbar === true || toolbar === 'filters') && /*#__PURE__*/_react["default"].createElement(_DataFilters.DataFilters, {
      layer: true
    })), /*#__PURE__*/_react["default"].createElement(_DataSummary.DataSummary, {
      key: "summary"
    })];
  }
  return /*#__PURE__*/_react["default"].createElement(_DataContext.DataContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    id: id,
    flex: false
  }, rest), toolbarContent, children));
};
Data.propTypes = _propTypes.DataPropTypes;