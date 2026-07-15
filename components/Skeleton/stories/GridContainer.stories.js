"use strict";

exports.__esModule = true;
exports["default"] = exports.GridContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _excluded = ["title"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var labels = [];
for (var i = 0; i < 10; i += 1) labels.push("Item " + i);
var skeleton = {
  message: {
    start: 'Loading',
    end: 'Content Loaded'
  }
};
var Item = function Item(_ref) {
  var title = _ref.title,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Card, _extends({
    pad: "medium",
    gap: "large",
    round: "medium",
    flex: "grow"
  }, rest), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "large",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "xsmall",
    height: "xsmall",
    background: "brand",
    round: "small",
    flex: false
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large",
    color: "text-strong",
    weight: "bold",
    skeleton: {
      width: 'xsmall'
    }
  }, title), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Add",
    reverse: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormAdd, null),
    secondary: true
  })));
};
var GridContainer = exports.GridContainer = function GridContainer() {
  var _useState = (0, _react.useState)(true),
    loading = _useState[0],
    setLoading = _useState[1];
  (0, _react.useEffect)(function () {
    setTimeout(function () {
      return setLoading(!loading);
    }, 3000);
  }, [loading]);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    skeleton: loading ? skeleton : undefined
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "small",
    gap: "small",
    columns: ['medium', 'medium']
  }, labels.map(function (label, index) {
    return /*#__PURE__*/_react["default"].createElement(Item, {
      key: label,
      title: label,
      skeleton: loading ? {
        animation: [{
          type: 'fadeIn',
          delay: index * 200
        }]
      } : undefined
    });
  })));
};
GridContainer.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Skeleton/GridContainer'
};