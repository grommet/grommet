"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Round = function Round() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    alignContent: "center",
    gap: "small",
    pad: "large"
  }, _react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: false
  }), _react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "xsmall"
  }), _react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "small"
  }), _react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "medium"
  }), _react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "large"
  }), _react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src
  })));
};

(0, _react2.storiesOf)('Avatar', module).add('Round', function () {
  return _react["default"].createElement(Round, null);
});