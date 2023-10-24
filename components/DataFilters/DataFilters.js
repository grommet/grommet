"use strict";

exports.__esModule = true;
exports.DataFilters = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Filter = require("grommet-icons/icons/Filter");
var _FormClose = require("grommet-icons/icons/FormClose");
var _Box = require("../Box");
var _Button = require("../Button");
var _DataFilter = require("../DataFilter");
var _DataForm = require("../Data/DataForm");
var _DataSort = require("../DataSort");
var _DropButton = require("../DropButton");
var _Header = require("../Header");
var _Heading = require("../Heading");
var _Layer = require("../Layer");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["drop", "children", "heading", "layer"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var dropProps = {
  align: {
    top: 'bottom',
    right: 'right'
  }
};
var layerProps = {
  full: 'vertical',
  position: 'right'
};
var DataFilters = exports.DataFilters = function DataFilters(_ref) {
  var drop = _ref.drop,
    children = _ref.children,
    heading = _ref.heading,
    layer = _ref.layer,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    clearFilters = _useContext.clearFilters,
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties,
    unfilteredData = _useContext.unfilteredData,
    view = _useContext.view;
  var _useContext2 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext2.format;
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  // touched is a map of form field name to its value, it only has fields that
  // were changed as part of the DataForm here. This is so we can track based
  // on what's inside DataFilters as opposed to trying to track from the view
  // object.
  var _useState2 = (0, _react.useState)({}),
    touched = _useState2[0],
    setTouched = _useState2[1];
  var controlled = (0, _react.useMemo)(function () {
    return drop || layer;
  }, [drop, layer]);
  // generate the badge value based on touched fields that have a value
  var badge = (0, _react.useMemo)(function () {
    return controlled && Object.keys(touched).filter(function (k) {
      return touched[k];
    }).length || undefined;
  }, [controlled, touched]);
  var clearControl = badge && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false,
    margin: {
      start: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: format({
      id: 'dataFilters.clear',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    onClick: function onClick() {
      setTouched({});
      clearFilters();
    }
  }));
  var content = children;
  if (_react.Children.count(children) === 0) {
    var filtersFor;
    if (!properties && unfilteredData && unfilteredData.length)
      // build from a piece of data, ignore object values
      filtersFor = Object.keys(unfilteredData[0]).filter(function (k) {
        return typeof unfilteredData[0][k] !== 'object';
      });else if (Array.isArray(properties)) filtersFor = properties;else if (typeof properties === 'object') filtersFor = Object.keys(properties);else filtersFor = [];
    content = filtersFor.map(function (property) {
      return /*#__PURE__*/_react["default"].createElement(_DataFilter.DataFilter, {
        key: property,
        property: property
      });
    });
    if (view != null && view.sort) {
      content.push( /*#__PURE__*/_react["default"].createElement(_DataSort.DataSort, {
        key: "_sort"
      }));
    }
  }
  content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, _extends({
    pad: controlled ? 'medium' : undefined,
    onDone: function onDone() {
      return setShowContent(false);
    },
    onTouched: controlled ? function (currentTouched) {
      return (
        // we merge this with our prior state to handle the case where the
        // user opens and closes the drop multiple times and we want to
        // track both new changes and prior changes.
        setTouched(function (prevTouched) {
          return _extends({}, prevTouched, currentTouched);
        })
      );
    } : undefined
  }, !controlled ? rest : {
    fill: 'vertical'
  }), layer && /*#__PURE__*/_react["default"].createElement(_Header.Header, null, /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    margin: "none",
    level: 2,
    size: "small"
  }, heading || format({
    id: 'dataFilters.heading',
    messages: messages == null ? void 0 : messages.dataFilters
  })), !controlled && clearControl, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_FormClose.FormClose, null),
    hoverIndicator: true,
    onClick: function onClick() {
      return setShowContent(undefined);
    }
  })), content);
  if (!controlled) return content;
  var tip = format({
    id: badge ? "dataFilters.openSet." + (badge === 1 ? 'singular' : 'plural') : 'dataFilters.open',
    messages: messages == null ? void 0 : messages.dataFilters,
    values: {
      number: badge
    }
  });
  var control;
  if (drop) {
    control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, {
      id: dataId + "--filters-control",
      tip: tip,
      "aria-label": tip,
      kind: "toolbar",
      icon: /*#__PURE__*/_react["default"].createElement(_Filter.Filter, null),
      hoverIndicator: true,
      dropProps: dropProps,
      dropContent: content,
      badge: badge,
      open: showContent,
      onOpen: function onOpen() {
        return setShowContent(undefined);
      },
      onClose: function onClose() {
        return setShowContent(undefined);
      }
    });
  } else if (layer) {
    control = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      id: dataId + "--filters-control",
      tip: tip,
      "aria-label": tip,
      kind: "toolbar",
      hoverIndicator: true,
      icon: /*#__PURE__*/_react["default"].createElement(_Filter.Filter, null),
      badge: badge,
      onClick: function onClick() {
        return setShowContent(true);
      }
    });
  }
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    flex: false,
    direction: "row"
  }, rest), control, clearControl, layer && showContent && /*#__PURE__*/_react["default"].createElement(_Layer.Layer, _extends({
    id: dataId + "--filters-layer"
  }, typeof layer === 'object' ? layer : layerProps, {
    onClickOutside: function onClickOutside() {
      return setShowContent(undefined);
    },
    onEsc: function onEsc() {
      return setShowContent(undefined);
    }
  }), content));
};
DataFilters.propTypes = _propTypes.DataFiltersPropTypes;