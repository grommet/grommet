"use strict";

exports.__esModule = true;
exports.Caret = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TipContent = function TipContent(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 22 22",
    version: "1.1",
    width: "22px",
    height: "22px"
  }, /*#__PURE__*/_react["default"].createElement("polygon", {
    fill: "grey",
    points: "6 2 18 12 6 22",
    transform: "matrix(-1 0 0 1 30 0)"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "grey",
    direction: "row",
    pad: "small",
    round: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "accent-1"
  }, message)));
};

var Caret = function Caret() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "center",
    background: "dark-1",
    fill: true,
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    textAlign: "center",
    level: "1",
    size: "xsmall"
  }, "Tooltip is styled with a Caret"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
    dropProps: {
      align: {
        left: 'right'
      }
    },
    content: /*#__PURE__*/_react["default"].createElement(TipContent, {
      message: "Designed with an SVG of Caret"
    }),
    plain: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Trash, null),
    plain: false
  }))))));
};

exports.Caret = Caret;
Caret.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};