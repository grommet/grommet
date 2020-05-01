"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gradient = [{
  value: 0,
  color: 'status-ok'
}, {
  value: 25,
  color: 'status-ok'
}, {
  value: 27,
  color: 'status-warning'
}, {
  value: 30,
  color: 'status-critical'
}];

var GradientCharts = function GradientCharts() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    id: "bar",
    type: "bar",
    color: gradient,
    values: [[10, 20], [20, 30], [30, 15]]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    id: "line",
    type: "line",
    color: gradient,
    values: [20, 30, 15]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    id: "area",
    type: "area",
    color: gradient,
    values: [{
      value: [10, 20]
    }, {
      value: [20, 30]
    }, {
      value: [30, 15]
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    id: "point",
    type: "point",
    color: gradient,
    values: [[10, 20], [20, 30], [30, 15]],
    round: true
  })));
};

(0, _react2.storiesOf)('Chart', module).add('Gradient', function () {
  return /*#__PURE__*/_react["default"].createElement(GradientCharts, null);
});