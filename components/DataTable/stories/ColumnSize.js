"use strict";

exports.__esModule = true;
exports.ColumnSize = exports.DATA = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DATA = [{
  name: 'Alan Josiah Werner Shirleen Foy',
  location: 'Winston Salem',
  date: '2018-01-09',
  percent: 24,
  paid: 3425
}, {
  name: 'Bryan Lane Smallwood Dion Gunderson',
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 30,
  paid: 1234
}, {
  name: 'Chris Willa Koehler Rocco Bales',
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 2345
}, {
  name: 'Eric Maegan Regalado Kiana Lawton',
  location: 'Palo Alto',
  date: '2018-06-11',
  percent: 80,
  paid: 3456
}, {
  name: 'Doug Yong Cleveland Jule Gantt',
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 60,
  paid: 1234
}, {
  name: 'Jet Isabella Mcnutt Deedee Bernstein',
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 3456
}, {
  name: 'Michael Corazon Ragan September Hynes',
  location: 'Boise',
  date: '2018-06-11',
  percent: 50,
  paid: 1234
}, {
  name: 'Tracy Kimbery Mccrary Jona Kinsey',
  location: 'San Francisco',
  date: '2018-06-10',
  percent: 10,
  paid: 2345
}];
exports.DATA = DATA;
var columnsThemeSize = [{
  property: 'name',
  header: 'Name',
  size: 'xlarge'
}, {
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
var columnsRelativeSize = [{
  property: 'name',
  header: 'Name',
  size: '1/2'
}, {
  property: 'location',
  header: 'Location',
  size: '1/4'
}, {
  property: 'date',
  header: 'Date',
  size: '1/4'
}];
var columnsAbsoluteSize = [{
  property: 'name',
  header: 'Name',
  size: '600px'
}, {
  property: 'location',
  header: 'Location',
  size: '200px'
}, {
  property: 'date',
  header: 'Date',
  size: '200px',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  size: '100px',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  size: '100px',
  align: 'end'
}];
var columnsDefault = [{
  property: 'name',
  header: 'Name'
}, {
  property: 'location',
  header: 'Location'
}, {
  property: 'date',
  header: 'Date',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  align: 'end'
}];

var ColumnSize = function ColumnSize() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, " Default DataTable"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columnsDefault,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Theme Column Sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columnsThemeSize,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Absolute Column Sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columnsAbsoluteSize,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Relative Column Sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columnsRelativeSize,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })));
};

exports.ColumnSize = ColumnSize;
ColumnSize.story = {
  name: 'Column sizes'
};