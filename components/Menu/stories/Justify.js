"use strict";

exports.__esModule = true;
exports["default"] = exports.Justify = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _grommetThemeHpe = require("grommet-theme-hpe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Justify = function Justify() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommetThemeHpe.hpe
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    alignSelf: "start",
    label: "Actions",
    items: [{
      label: 'Hey',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
      justify: 'center'
    }, {
      label: 'Hello',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
      justify: 'end'
    }, {
      label: 'Hii',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null)
    }]
  })));
};

exports.Justify = Justify;
Justify.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Menu/Justify'
};
exports["default"] = _default;