"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleDistribution = function SimpleDistribution() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Distribution, {
    fill: true,
    values: [{
      value: 50,
      color: 'light-3'
    }, {
      value: 30,
      color: 'neutral-1'
    }, {
      value: 20,
      color: 'brand'
    }, {
      value: 10,
      color: 'light-3'
    }, {
      value: 5,
      color: 'neutral-1'
    }]
  }, function (value) {
    return _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: value.color,
      fill: true
    }, _react.default.createElement(_grommet.Text, {
      size: "large"
    }, value.value));
  }));
};

(0, _react2.storiesOf)('Distribution', module).add('Simple', function () {
  return _react.default.createElement(SimpleDistribution, null);
});