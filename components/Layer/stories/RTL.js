"use strict";

exports.__esModule = true;
exports.RTLLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RTLLayer = function RTLLayer() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    dir: "rtl"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    position: "start",
    margin: {
      vertical: 'small',
      start: 'xlarge',
      end: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "small",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"))));
};

exports.RTLLayer = RTLLayer;
RTLLayer.story = {
  name: 'RTL'
};