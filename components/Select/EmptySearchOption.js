"use strict";

exports.__esModule = true;
exports.EmptySearchOption = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var EmptySearchOption = exports.EmptySearchOption = function EmptySearchOption(_ref) {
  var _theme$select, _theme$select2, _theme$select3;
  var emptySearchMessage = _ref.emptySearchMessage,
    selectOptionsStyle = _ref.selectOptionsStyle,
    theme = _ref.theme;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, (theme == null || (_theme$select = theme.select) == null || (_theme$select = _theme$select.emptySearchMessage) == null ? void 0 : _theme$select.container) || selectOptionsStyle, /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    "aria-live": "polite",
    role: "alert"
  }, (theme == null || (_theme$select2 = theme.select) == null || (_theme$select2 = _theme$select2.emptySearchMessage) == null ? void 0 : _theme$select2.text) || ((_theme$select3 = theme.select) == null || (_theme$select3 = _theme$select3.options) == null ? void 0 : _theme$select3.text)), emptySearchMessage));
};