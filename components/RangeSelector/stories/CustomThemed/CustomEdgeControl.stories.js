"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomEdgeControl = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _excluded = ["direction"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var customEdge = (0, _utils.deepMerge)(_themes.grommet, {
  rangeSelector: {
    edge: {
      type: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Gremlin, {
        size: "large",
        color: "neutral-2"
      })
      // it is also possible to use an actual node
      // type:  <div style={{ padding: '24px', background: 'red' }} />,
    }
  }
});
var CustomEdgeControl = exports.CustomEdgeControl = function CustomEdgeControl(_ref) {
  var _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)([2, 7]),
    range = _useState[0],
    setRange = _useState[1];
  var onChange = function onChange(values) {
    setRange(values);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customEdge
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "xlarge",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    style: {
      fontFamily: 'Comic Sans MS'
    },
    color: "brand"
  }, "Feed the gremlins with grommets...", ' '), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: value,
      width: "xsmall",
      height: "xsmall",
      justify: "center",
      align: "center",
      pad: "small",
      border: false
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
      color: "brand",
      size: "small"
    }));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, _extends({
    direction: direction,
    min: 0,
    max: 9,
    size: "full",
    values: range,
    color: "accent-3",
    onChange: onChange
  }, rest)))));
};
CustomEdgeControl.storyName = 'Custom edge controls';
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Custom Themed/Custom edge controls'
};