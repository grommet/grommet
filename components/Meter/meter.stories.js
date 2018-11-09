"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BarMeter = function BarMeter() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: 30
    }]
  }));
};

var CircleMeter = function CircleMeter() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: 30
    }]
  }));
};

var LabelledMeter = function LabelledMeter() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "start"
  }, _react.default.createElement(_grommet.Stack, {
    anchor: "center"
  }, _react.default.createElement(_grommet.Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: 30
    }],
    size: "xsmall",
    thickness: "small"
  }), _react.default.createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, _react.default.createElement(_grommet.Text, {
    size: "xlarge",
    weight: "bold"
  }, "30"), _react.default.createElement(_grommet.Text, {
    size: "small"
  }, "%")))));
};

(0, _react2.storiesOf)('Meter', module).add('Bar', function () {
  return _react.default.createElement(BarMeter, null);
}).add('Circle', function () {
  return _react.default.createElement(CircleMeter, null);
}).add('Labelled', function () {
  return _react.default.createElement(LabelledMeter, null);
});