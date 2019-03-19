"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultTable = function DefaultTable() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Table, {
    caption: "Default Table"
  }, _react.default.createElement(_grommet.TableHeader, null, _react.default.createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.label));
  }))), _react.default.createElement(_grommet.TableBody, null, _data.data.map(function (datum) {
    return _react.default.createElement(_grommet.TableRow, {
      key: datum.id
    }, _data.columns.map(function (c) {
      return _react.default.createElement(_grommet.TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, _react.default.createElement(_grommet.Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), _react.default.createElement(_grommet.TableFooter, null, _react.default.createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.footer));
  }))))));
};

(0, _react2.storiesOf)('Table', module).add('Default', function () {
  return _react.default.createElement(DefaultTable, null);
});