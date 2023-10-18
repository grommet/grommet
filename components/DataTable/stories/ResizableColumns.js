"use strict";

exports.__esModule = true;
exports["default"] = exports.ResizableDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
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
var ResizableDataTable = exports.ResizableDataTable = function ResizableDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: "3"
    }, "Table with resizable & column sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: columnsResize,
      data: DATA,
      primaryKey: false,
      resizeable: true
    }))
    // </Grommet>
  );
};

ResizableDataTable.storyName = 'Resizable columns';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Resizable columns'
};