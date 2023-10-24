"use strict";

exports.__esModule = true;
exports.Data = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _DataFilters = require("../DataFilters");
var _DataSearch = require("../DataSearch");
var _DataSummary = require("../DataSummary");
var _DataView = require("../DataView");
var _Toolbar = require("../Toolbar");
var _DataContext = require("../../contexts/DataContext");
var _propTypes = require("./propTypes");
var _filter = require("./filter");
var _excluded = ["children", "data", "defaultView", "filteredTotal", "id", "messages", "onView", "properties", "toolbar", "total", "updateOn", "view", "views"];
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
    _ref$updateOn = _ref.updateOn,
    updateOn = _ref$updateOn === void 0 ? 'submit' : _ref$updateOn,
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

  // what we use for DataContext value
  var contextValue = (0, _react.useMemo)(function () {
    var value = _extends({
      id: id,
      messages: messages,
      properties: properties,
      updateOn: updateOn,
      view: view,
      views: views
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
    value.addToolbarKey = function (key) {
      setToolbarKeys(function (prevKeys) {
        if (prevKeys.includes(key)) return prevKeys;
        return [].concat(prevKeys, [key]);
      });
    };
    value.toolbarKeys = toolbarKeys;
    return value;
  }, [defaultView, id, messages, onView, properties, result, toolbarKeys, updateOn, view, views]);
  var toolbarContent;
  if (toolbar) {
    toolbarContent = [/*#__PURE__*/_react["default"].createElement(_Toolbar.Toolbar, {
      key: "toolbar"
    }, (toolbar === true || toolbar === 'search') && /*#__PURE__*/_react["default"].createElement(_DataSearch.DataSearch, null), (toolbar === true || toolbar === 'view') && /*#__PURE__*/_react["default"].createElement(_DataView.DataView, null), (toolbar === true || toolbar === 'filters') && /*#__PURE__*/_react["default"].createElement(_DataFilters.DataFilters, {
      drop: true
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