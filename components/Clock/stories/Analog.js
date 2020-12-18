"use strict";

exports.__esModule = true;
exports.Analog = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'huge'];

var Analog = function Analog() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small",
    pad: "large"
  }, sizes.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, size), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
      type: "analog",
      size: size
    }));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "xxlarge and huge sizes are equal. The latter is kept for beckwards compatibility.")));
};

exports.Analog = Analog;
Analog.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};