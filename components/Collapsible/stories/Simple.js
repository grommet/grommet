"use strict";

exports.__esModule = true;
exports["default"] = exports.Default = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Default = function Default(props) {
  var _React$useState = _react["default"].useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    onClick: function onClick() {
      return setOpen(!open);
    },
    label: "Toggle"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Collapsible, _extends({
    open: open
  }, props), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    round: "medium",
    pad: "medium",
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "This is a box inside a Collapsible component"))), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "This is other content outside the Collapsible box")));
};

exports.Default = Default;
Default.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Utilities/Collapsible/Default'
};
exports["default"] = _default;