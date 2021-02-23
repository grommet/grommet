"use strict";

exports.__esModule = true;
exports["default"] = exports.Placeholder = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var Placeholder = function Placeholder() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: _data.columns,
    data: _data.DATA,
    placeholder: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      direction: "row",
      pad: "large",
      gap: "small",
      background: {
        color: 'background-front',
        opacity: 'strong'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "Loading ...")),
    step: 10
  })));
};

exports.Placeholder = Placeholder;
var _default = {
  title: 'Visualizations/DataTable/Placeholder'
};
exports["default"] = _default;