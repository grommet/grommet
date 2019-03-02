"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabelledChart = function LabelledChart(_ref) {
  var color = _ref.color,
      label = _ref.label,
      value = _ref.value;
  return _react.default.createElement(_grommet.Box, {
    flex: false,
    basis: "xsmall",
    align: "center",
    gap: "small"
  }, _react.default.createElement(_grommet.Chart, {
    bounds: [[0, 2], [0, 400]],
    type: "bar",
    values: [{
      value: [1, value]
    }],
    color: color,
    round: true,
    size: {
      height: 'medium',
      width: 'xsmall'
    }
  }), _react.default.createElement(_grommet.Box, {
    align: "center"
  }, _react.default.createElement(_grommet.Text, null, label), _react.default.createElement(_grommet.Text, {
    weight: "bold"
  }, value, " TiB")));
};

var LabelledCharts = function LabelledCharts() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    pad: "large",
    direction: "row",
    gap: "medium"
  }, _react.default.createElement(LabelledChart, {
    label: "Exported",
    value: 300
  }), _react.default.createElement(LabelledChart, {
    label: "Usable",
    value: 200,
    color: "accent-2"
  }), _react.default.createElement(LabelledChart, {
    label: "Used",
    value: 98.2,
    color: "accent-3"
  })));
};

(0, _react2.storiesOf)('Chart', module).add('Labelled', function () {
  return _react.default.createElement(LabelledCharts, null);
});