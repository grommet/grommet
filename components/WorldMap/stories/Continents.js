"use strict";

exports.__esModule = true;
exports["default"] = exports.Continents = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Continents = function Continents() {
  var _React$useState = _react["default"].useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.WorldMap, {
    continents: [{
      name: 'Africa',
      color: 'graph-1',
      onClick: function onClick() {
        return setActive(!active);
      }
    }]
  }), active && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "large"
  }, "Africa")));
};

exports.Continents = Continents;
var _default = {
  title: 'Visualizations/WorldMap/Continents'
};
exports["default"] = _default;