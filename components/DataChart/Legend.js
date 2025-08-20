"use strict";

exports.__esModule = true;
exports.Legend = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _Text = require("../Text");
var _Swatch = require("./Swatch");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Legend = exports.Legend = function Legend(_ref) {
  var activeProperty = _ref.activeProperty,
    seriesProp = _ref.series,
    seriesStyles = _ref.seriesStyles,
    setActiveProperty = _ref.setActiveProperty;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var series = (0, _react.useMemo)(function () {
    return seriesProp.filter(function (s) {
      return seriesStyles[s.property];
    });
  }, [seriesProp, seriesStyles]);
  var interactive = (0, _react.useMemo)(
  // filter out properties that are used in point chart aspects
  function () {
    return series.filter(function (_ref2) {
      var property = _ref2.property;
      return !seriesStyles[property].aspect;
    }).length > 1;
  }, [series, seriesStyles]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    margin: theme.dataChart.legend.margin,
    direction: "row",
    wrap: true,
    gap: theme.dataChart.legend.gap
  }, series.map(function (_ref3) {
    var _theme$dataChart, _theme$dataChart2;
    var property = _ref3.property,
      label = _ref3.label;
    var isActive = property === activeProperty;
    var swatchProps = {};
    var textProps = {};
    if (activeProperty !== undefined) {
      if (!isActive) {
        // swatchProps.color = 'status-disabled';
        textProps.color = 'text-xweak';
      } else {
        textProps.color = 'text-strong';
      }
    }
    var content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: property,
      direction: "row",
      align: "center",
      pad: (_theme$dataChart = theme.dataChart) == null || (_theme$dataChart = _theme$dataChart.legend) == null || (_theme$dataChart = _theme$dataChart.item) == null ? void 0 : _theme$dataChart.pad,
      gap: (_theme$dataChart2 = theme.dataChart) == null || (_theme$dataChart2 = _theme$dataChart2.legend) == null || (_theme$dataChart2 = _theme$dataChart2.item) == null ? void 0 : _theme$dataChart2.gap
    }, /*#__PURE__*/_react["default"].createElement(_Swatch.Swatch, _extends({}, seriesStyles[property], swatchProps)), /*#__PURE__*/_react["default"].createElement(_Text.Text, textProps, label || property));
    if (interactive) {
      content = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        key: property,
        active: isActive,
        "aria-pressed": isActive ? 'true' : 'false',
        onClick: function onClick() {
          return setActiveProperty(isActive ? undefined : property);
        },
        hoverIndicator: true
      }, content);
    }
    return content;
  }));
};