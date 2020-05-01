"use strict";

exports.__esModule = true;
exports.DATA = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DATA = [{
  location: 'Winston Salem',
  date: '2018-01-09',
  percent: 24,
  paid: 3425
}, {
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 30,
  paid: 1234
}, {
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 2345
}, {
  location: 'Palo Alto',
  date: '2018-06-11',
  percent: 80,
  paid: 3456
}, {
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 60,
  paid: 1234
}, {
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 3456
}, {
  location: 'Boise',
  date: '2018-06-11',
  percent: 50,
  paid: 1234
}, {
  location: 'San Francisco',
  date: '2018-06-10',
  percent: 10,
  paid: 2345
}];
exports.DATA = DATA;
var columnsResize = [{
  property: 'location',
  header: 'Location',
  size: 'small'
}, {
  property: 'date',
  header: 'Date',
  size: 'small',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  size: 'xsmall',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  size: 'xsmall',
  align: 'end'
}];

var ExampleResizable = function ExampleResizable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Table with resizeable & column sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columnsResize,
    data: DATA,
    primaryKey: false,
    resizeable: true
  })));
};

(0, _react2.storiesOf)('DataTable', module).add('Column Sizes resizeable', function () {
  return /*#__PURE__*/_react["default"].createElement(ExampleResizable, null);
});