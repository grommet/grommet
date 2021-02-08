"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = {
  global: {
    font: {
      family: 'Helvetica'
    }
  },
  table: {
    body: {
      align: 'center',
      pad: {
        horizontal: 'large',
        vertical: 'xsmall'
      },
      border: 'horizontal'
    },
    extend: function extend() {
      return "font-family: Arial";
    },
    footer: {
      align: 'start',
      border: undefined,
      pad: {
        horizontal: 'large',
        vertical: 'small'
      },
      verticalAlign: 'bottom'
    },
    header: {
      align: 'center',
      border: 'bottom',
      fill: 'horizontal',
      pad: {
        horizontal: 'large',
        vertical: 'xsmall'
      },
      verticalAlign: 'bottom',
      background: {
        color: 'accent-1',
        opacity: 'strong'
      }
    }
  }
};

var Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Table, {
    caption: "Custom Theme Table"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, c.label));
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.TableBody, null, _data.data.map(function (datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, {
      key: datum.id
    }, _data.columns.map(function (c) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.TableFooter, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
      key: c.property,
      align: c.align
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, c.footer));
  }))))));
};

exports.Custom = Custom;
var _default = {
  title: 'Visualizations/Table/Custom'
};
exports["default"] = _default;