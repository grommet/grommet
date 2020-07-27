"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var values = [{
  value: [10, 20],
  thickness: 12,
  color: 'status-critical',
  opacity: 'medium'
}, {
  value: [10, 30],
  thickness: 29,
  color: 'status-critical',
  opacity: 'medium'
}, {
  value: [11, 37],
  thickness: 68,
  color: 'status-critical',
  opacity: 'medium'
}, {
  value: [13, 10],
  thickness: 'small',
  color: 'status-critical',
  opacity: 'medium'
}, {
  value: [20, 30],
  thickness: 'small',
  color: 'status-ok'
}, {
  value: [22, 5],
  thickness: 'medium',
  color: 'status-ok'
}, {
  value: [27, 42],
  thickness: 'large',
  color: 'status-ok'
}, {
  value: [30, 15],
  thickness: 'large',
  color: 'status-warning'
}];

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "point",
    point: "circle",
    values: values
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "bar",
    values: values
  })));
};

(0, _react2.storiesOf)('Chart', module).add('Value Style', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});