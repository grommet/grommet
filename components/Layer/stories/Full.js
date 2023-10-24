"use strict";

exports.__esModule = true;
exports["default"] = exports.FullLayer = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FullLayer = exports.FullLayer = function FullLayer() {
  var _React$useState = _react["default"].useState(false),
    showLayer = _React$useState[0],
    setShowLayer = _React$useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small",
      fill: true,
      background: "dark-3",
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      primary: true,
      color: "accent-3",
      label: "Show",
      onClick: function onClick() {
        return setShowLayer(true);
      }
    }), showLayer && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
      full: true,
      animation: "fadeIn"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      background: "light-4",
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      primary: true,
      label: "Close",
      onClick: function onClick() {
        return setShowLayer(false);
      }
    }))))
    // </Grommet>
  );
};

FullLayer.storyName = 'Full';
FullLayer.parameters = {
  chromatic: {
    disable: true
  }
};
FullLayer.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Layer/Full'
};