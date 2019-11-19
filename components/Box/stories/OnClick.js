"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OnClickBox = function OnClickBox() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Box, {
    border: true,
    pad: "large",
    align: "center",
    round: true,
    gap: "small",
    hoverIndicator: true,
    onClick: function onClick() {
      alert('clicked');
    }
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "large"
  }), _react["default"].createElement(_grommet.Text, null, "Party"))));
};

(0, _react2.storiesOf)('Box', module).add('onClick', function () {
  return _react["default"].createElement(OnClickBox, null);
});