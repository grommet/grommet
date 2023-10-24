"use strict";

exports.__esModule = true;
exports["default"] = exports.AllowSelectAll = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _CheckBox = require("../../CheckBox");
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
var columns = [{
  property: 'name',
  header: 'Name'
}, {
  property: 'location',
  header: 'Location'
}, {
  property: 'date',
  header: 'Date'
}, {
  property: 'percent',
  header: 'Percent'
}, {
  property: 'paid',
  header: 'Paid'
}];
var AllowSelectAll = exports.AllowSelectAll = function AllowSelectAll() {
  var _React$useState = _react["default"].useState(true),
    allowSelectAll = _React$useState[0],
    setAllowSelectAll = _React$useState[1];
  var _React$useState2 = _react["default"].useState([]),
    select = _React$useState2[0],
    setSelect = _React$useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    direction: "column",
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "When checked, the Select All checkbox of the DataTable is allowed"), /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
    checked: allowSelectAll,
    label: "Allow Select All",
    onChange: function onChange(event) {
      return setAllowSelectAll(event.target.checked);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    data: DATA,
    columns: columns,
    select: select,
    onSelect: function onSelect(selected) {
      return setSelect(selected);
    },
    allowSelectAll: allowSelectAll
  }));
};
AllowSelectAll.storyName = 'Allow Select All';
AllowSelectAll.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Allow Select All'
};