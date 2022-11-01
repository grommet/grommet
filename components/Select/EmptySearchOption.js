"use strict";

exports.__esModule = true;
exports.EmptySearchOption = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
var _StyledSelect = require("./StyledSelect");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var EmptySearchOption = function EmptySearchOption(_ref) {
  var emptySearchMessage = _ref.emptySearchMessage,
    selectOptionsStyle = _ref.selectOptionsStyle,
    theme = _ref.theme;
  return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectOption, {
    key: "search_empty",
    tabIndex: "0",
    role: "menuitem",
    hoverIndicator: "background",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, selectOptionsStyle, /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    "aria-live": "polite",
    role: "alert"
  }, theme.select.container.text), emptySearchMessage)));
};
exports.EmptySearchOption = EmptySearchOption;