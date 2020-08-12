"use strict";

exports.__esModule = true;
exports.locations = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
exports.locations = locations;
var theme = (0, _utils.deepMerge)(_themes.grommet, {
  list: {
    item: {
      pad: {
        horizontal: 'large',
        vertical: 'xsmall'
      },
      background: ['white', 'light-2'],
      border: true
    }
  }
});

var ThemedList = function ThemedList() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: locations
  })));
};

(0, _react2.storiesOf)('List', module).add('theme', function () {
  return /*#__PURE__*/_react["default"].createElement(ThemedList, null);
});