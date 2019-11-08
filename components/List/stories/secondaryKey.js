"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SecondaryKeyList = function SecondaryKeyList() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.List, {
    data: _data.data.slice(0, 10),
    primaryKey: "entry",
    secondaryKey: "location"
  })));
};

(0, _react2.storiesOf)('List', module).add('secondaryKey', function () {
  return _react["default"].createElement(SecondaryKeyList, null);
});