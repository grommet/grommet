"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _excluded = ["direction"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var customThemeRangeSelector = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    borderSize: {
      small: '6px'
    },
    edgeSize: {
      small: '13px'
    },
    spacing: '10px',
    colors: {
      control: 'accent-2',
      border: 'brand'
    }
  },
  rangeSelector: {
    background: {
      invert: {
        color: 'brand'
      }
    },
    edge: {
      type: 'bar'
    }
  }
});
var Custom = exports.Custom = function Custom(_ref) {
  var _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)([12, 16]),
    range = _useState[0],
    setRange = _useState[1];
  var onChange = function onChange(values) {
    setRange(values);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customThemeRangeSelector
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: direction === 'vertical' ? 'column' : 'row',
    justify: "between"
  }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: value,
      width: "xxsmall",
      height: "xxsmall",
      align: "center",
      pad: "small",
      border: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, _extends({
    invert: true,
    direction: direction,
    min: 10,
    max: 20,
    size: "full",
    values: range,
    onChange: onChange
  }, rest)))));
};
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Custom Themed/Custom'
};