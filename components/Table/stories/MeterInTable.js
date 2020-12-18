"use strict";

exports.__esModule = true;
exports.MeterInTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable react/no-array-index-key */
var values = [20, 40, 60, 80, 100];

var MeterInTable = function MeterInTable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    pad: {
      top: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Table, {
    caption: "Meter Inside Table"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TableBody, null, values.map(function (val, index) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, {
      key: index
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "bar",
      values: [{
        value: val
      }]
    })), /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, val, "% complete")));
  }))))));
};

exports.MeterInTable = MeterInTable;
MeterInTable.story = {
  name: 'Meter inside table'
};