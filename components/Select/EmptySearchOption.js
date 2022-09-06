"use strict";

exports.__esModule = true;
exports.EmptySearchOption = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = require("../Box");

var _Text = require("../Text");

var _StyledSelect = require("./StyledSelect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EmptySearchOption = function EmptySearchOption(_ref) {
  var emptySearchMessage = _ref.emptySearchMessage,
      selectOptionsStyle = _ref.selectOptionsStyle,
      theme = _ref.theme;
  return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectOption, {
    key: "search_empty",
    tabIndex: "0",
    role: "menuitem",
    hoverIndicator: "background",
    disabled: true,
    "aria-live": "polite"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, selectOptionsStyle, /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.select.container.text, emptySearchMessage)));
};

exports.EmptySearchOption = EmptySearchOption;