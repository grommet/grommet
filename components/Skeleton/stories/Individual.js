"use strict";

exports.__esModule = true;
exports["default"] = exports.Individual = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["title"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var Item = function Item(_ref) {
  var title = _ref.title,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Card, _extends({
    width: "531px",
    pad: "medium",
    gap: "large",
    round: "medium",
    background: "status-warning",
    flex: "grow"
  }, rest), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "text-strong",
    size: "xlarge",
    weight: "bold",
    skeleton: {
      width: 'medium'
    }
  }, title), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    background: "orange!",
    round: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large",
    color: "text-strong",
    weight: "bold",
    skeleton: {
      width: 'small'
    }
  }, "Acme Operations"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Learn More"
  })));
};
var skeleton = {
  animation: 'fadeIn'
};
var Content = function Content() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(Item, {
    title: "Operations assurance and security platform"
  }), /*#__PURE__*/_react["default"].createElement(Item, {
    skeleton: skeleton
  }));
};
var Individual = exports.Individual = function Individual() {
  var theme = (0, _react.useContext)(_grommet.ThemeContext);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(Content, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme,
    themeMode: "dark"
  }, /*#__PURE__*/_react["default"].createElement(Content, null)));
};
var _default = exports["default"] = {
  title: 'Visualizations/Skeleton/Individual'
};