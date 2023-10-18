"use strict";

exports.__esModule = true;
exports["default"] = exports.LabelledCharts = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var LabelledChart = function LabelledChart(_ref) {
  var color = _ref.color,
    label = _ref.label,
    value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: false,
    basis: "xsmall",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
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
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, value, " TiB")));
};
var LabelledCharts = exports.LabelledCharts = function LabelledCharts() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      direction: "row",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(LabelledChart, {
      label: "Exported",
      value: 300
    }), /*#__PURE__*/_react["default"].createElement(LabelledChart, {
      label: "Usable",
      value: 200,
      color: "graph-1"
    }), /*#__PURE__*/_react["default"].createElement(LabelledChart, {
      label: "Used",
      value: 98.2,
      color: "graph-2"
    }))
    // </Grommet>
  );
};

LabelledCharts.storyName = 'Labelled';
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Labelled'
};