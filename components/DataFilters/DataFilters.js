"use strict";

exports.__esModule = true;
exports.DataFilters = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Filter = require("grommet-icons/icons/Filter");
var _Close = require("grommet-icons/icons/Close");
var _Box = require("../Box");
var _Button = require("../Button");
var _DataClearFilters = require("../DataClearFilters");
var _DataFilter = require("../DataFilter");
var _DataForm = require("../Data/DataForm");
var _DropButton = require("../DropButton");
var _Header = require("../Header");
var _Heading = require("../Heading");
var _Layer = require("../Layer");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["drop", "children", "clearFilters", "heading", "layer", "updateOn"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var defaultTouched = {};
var DataFilters = exports.DataFilters = function DataFilters(_ref) {
  var drop = _ref.drop,
    children = _ref.children,
    _ref$clearFilters = _ref.clearFilters,
    clearFilters = _ref$clearFilters === void 0 ? true : _ref$clearFilters,
    heading = _ref.heading,
    layer = _ref.layer,
    updateOn = _ref.updateOn,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties,
    unfilteredData = _useContext.unfilteredData,
    filtersCleared = _useContext.filtersCleared,
    setFiltersCleared = _useContext.setFiltersCleared,
    view = _useContext.view;
  var _useContext2 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext2.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  // touched is a map of property to its value based on if user interacts
  // with a filter or a view applies of set of filters
  var _useState2 = (0, _react.useState)(defaultTouched),
    touched = _useState2[0],
    setTouched = _useState2[1];

  // if filters have been applied by this DataFilters, update
  // the DataContext that filters are not in a "cleared" state
  (0, _react.useEffect)(function () {
    setFiltersCleared(!Object.keys(touched).length);
  }, [touched, setFiltersCleared]);

  // if filters have been cleared via clearFilters in DataContext,
  // reset touched to default state so badge is removed
  (0, _react.useEffect)(function () {
    if (filtersCleared) {
      setTouched(defaultTouched);
    }
  }, [filtersCleared]);
  var controlled = (0, _react.useMemo)(function () {
    return drop || layer;
  }, [drop, layer]);
  var configured = _react.Children.count(children) === 0;
  (0, _react.useEffect)(function () {
    // when view changes via DataView or user interacting with filters,
    // adjust badge to reflect that
    if (controlled && view.properties) {
      var nextTouched = _extends({}, view.properties);
      Object.keys(nextTouched).forEach(function (k) {
        var _properties$k;
        if ((properties == null || (_properties$k = properties[k]) == null ? void 0 : _properties$k.badge) === false || configured && properties && !(properties != null && properties[k])) {
          delete nextTouched[k];
        }
      });
      setTouched(nextTouched);
    }
  }, [configured, controlled, properties, view]);

  // generate the badge value based on touched fields that have a value.
  // only show the badge based off of what's included in this DataFilters
  // since multiple DataFilters may exist
  var badge = (0, _react.useMemo)(function () {
    return controlled && Object.keys(touched).filter(function (k) {
      return touched[k];
    }).length || undefined;
  }, [controlled, touched]);
  var clearControl = badge && clearFilters && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false,
    margin: {
      start: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_DataClearFilters.DataClearFilters, null));
  var content = children;
  if (_react.Children.count(children) === 0) {
    var filtersFor;
    if (!properties && unfilteredData && unfilteredData.length)
      // build from a piece of data, ignore object values
      filtersFor = Object.keys(unfilteredData[0]).filter(function (k) {
        return typeof unfilteredData[0][k] !== 'object';
      });else if (Array.isArray(properties)) filtersFor = properties;else if (typeof properties === 'object') {
      filtersFor = Object.keys(properties).filter(function (property) {
        var _properties$property;
        return !(((_properties$property = properties[property]) == null ? void 0 : _properties$property.filter) === false);
      });
    } else filtersFor = [];
    content = filtersFor.map(function (property) {
      return /*#__PURE__*/_react["default"].createElement(_DataFilter.DataFilter, {
        key: property,
        property: property
      });
    });
  }
  content = /*#__PURE__*/_react["default"].createElement(_DataForm.DataForm, _extends({
    pad: controlled ? 'medium' : undefined,
    onDone: function onDone() {
      return setShowContent(false);
    },
    updateOn: updateOn
  }, !controlled ? rest : {
    fill: 'vertical'
  }), layer && /*#__PURE__*/_react["default"].createElement(_Header.Header, null, /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    margin: "none",
    level: 2
  }, heading || format({
    id: 'dataFilters.heading',
    messages: messages == null ? void 0 : messages.dataFilters
  })), !controlled && clearControl, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_Close.Close, null),
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
    var _theme$data$button;
    control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, {
      id: dataId + "--filters-control",
      tip: tip,
      "aria-label": tip,
      kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
      icon: /*#__PURE__*/_react["default"].createElement(_Filter.Filter, null),
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
    var _theme$data$button2;
    control = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      id: dataId + "--filters-control",
      tip: tip,
      "aria-label": tip,
      kind: (_theme$data$button2 = theme.data.button) == null ? void 0 : _theme$data$button2.kind,
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
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: {
      min: 'medium'
    }
  }, content)));
};
DataFilters.propTypes = _propTypes.DataFiltersPropTypes;