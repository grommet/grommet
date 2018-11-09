"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleStack = function SimpleStack() {
  return _react.default.createElement(_grommet.Grommet, null, _react.default.createElement(_grommet.Stack, {
    anchor: "center"
  }, _react.default.createElement(_grommet.Box, {
    pad: "large",
    background: "neutral-1"
  }), _react.default.createElement(_grommet.Box, {
    pad: "small",
    background: "accent-1"
  })));
};

var FillStack = function FillStack() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Stack, {
    fill: true
  }, _react.default.createElement(_grommet.Box, {
    background: "brand",
    fill: true
  }, "Test")));
};

(0, _react2.storiesOf)('Stack', module).add('Simple Stack', function () {
  return _react.default.createElement(SimpleStack, null);
}).add('Fill Stack', function () {
  return _react.default.createElement(FillStack, null);
});