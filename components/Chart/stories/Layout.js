"use strict";

exports.__esModule = true;
exports["default"] = exports.Layout = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var type = 'bar';
var value = 10;
var values = Array(14).fill(0).map(function (_, index) {
  var delta = index * 3;
  value += delta % 2 ? delta : -delta;
  return [index, value];
});
var Layout = exports.Layout = function Layout() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      margin: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2
    }, "full"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      border: true,
      alignSelf: "stretch"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: type,
      values: values,
      size: {
        width: 'full'
      },
      round: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2
    }, "auto, gap"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      border: true,
      alignSelf: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: type,
      values: values,
      size: {
        width: 'auto'
      },
      gap: "small",
      round: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2
    }, "default"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      borde: true,
      alignSelf: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: type,
      values: values,
      round: true
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Layout'
};