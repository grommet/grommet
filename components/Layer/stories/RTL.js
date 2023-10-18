"use strict";

exports.__esModule = true;
exports["default"] = exports.RTLLayer = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RTLLayer = exports.RTLLayer = function RTLLayer() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Layer, {
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
    }, "text")))
    // </Grommet>
  );
};

RTLLayer.storyName = 'RTL';
RTLLayer.args = {
  dir: 'rtl'
};
var _default = exports["default"] = {
  title: 'Layout/Layer/RTL'
};