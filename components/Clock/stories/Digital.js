"use strict";

exports.__esModule = true;
exports["default"] = exports.Digital = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var override = {
  clock: {
    digital: {
      text: {
        customSize: {
          size: '30px',
          height: 1.234
        }
      }
    }
  }
};
var theme = (0, _utils.deepMerge)(_themes.grommet, override);
var clockSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];

var Digital = function Digital() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium",
    pad: "medium"
  }, clockSizes.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, size), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
      type: "digital",
      size: size
    }));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Default size (medium)"), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    type: "digital"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Custom size"), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    type: "digital",
    size: "customSize"
  }))));
};

exports.Digital = Digital;
Digital.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Clock/Digital'
};
exports["default"] = _default;