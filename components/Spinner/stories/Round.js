"use strict";

exports.__esModule = true;
exports["default"] = exports.Round = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RoundSpinner = function RoundSpinner(_ref) {
  var round = _ref.round;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    round: round,
    border: false,
    size: "large",
    background: "linear-gradient(to right, #fc466b, #3f5efb)"
  });
};

var Round = function Round() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "medium",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(RoundSpinner, {
    round: false
  }), /*#__PURE__*/_react["default"].createElement(RoundSpinner, {
    round: "small"
  }), /*#__PURE__*/_react["default"].createElement(RoundSpinner, {
    round: "medium"
  }), /*#__PURE__*/_react["default"].createElement(RoundSpinner, {
    round: "full"
  })));
};

exports.Round = Round;
Round.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Spinner/Round'
};
exports["default"] = _default;