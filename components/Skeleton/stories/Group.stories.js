"use strict";

exports.__esModule = true;
exports["default"] = exports.Group = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _useThemeValue2 = require("../../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Item = function Item(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_grommet.Card, _extends({
    width: "531px",
    pad: "medium",
    gap: "large",
    round: "medium",
    flex: "grow",
    border: true
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
    background: "orange!",
    round: "small"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large",
    color: "text-strong",
    weight: "bold",
    skeleton: {
      width: 'small'
    }
  }, "Compliance"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Add",
    reverse: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormAdd, null),
    secondary: true
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
    gap: "medium",
    skeleton: skeleton
  }, /*#__PURE__*/_react["default"].createElement(Item, null), /*#__PURE__*/_react["default"].createElement(Item, null), /*#__PURE__*/_react["default"].createElement(Item, null), /*#__PURE__*/_react["default"].createElement(Item, null), /*#__PURE__*/_react["default"].createElement(Item, null));
};
var Group = exports.Group = function Group() {
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(Content, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme,
    themeMode: "dark"
  }, /*#__PURE__*/_react["default"].createElement(Content, null)));
};
Group.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Skeleton/Group'
};