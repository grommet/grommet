"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledDataTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var controlledColumns = _data.columns.map(function (col) {
  return _extends({}, col);
});

delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;

var ControlledDataTable = function ControlledDataTable() {
  var _React$useState = _react["default"].useState([]),
      checked = _React$useState[0],
      setChecked = _React$useState[1];

  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };

  var onCheckAll = function onCheckAll(event) {
    return setChecked(event.target.checked ? _data.DATA.map(function (datum) {
      return datum.name;
    }) : []);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: [{
      property: 'checkbox',
      render: function render(datum) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
          key: datum.name,
          checked: checked.indexOf(datum.name) !== -1,
          onChange: function onChange(e) {
            return onCheck(e, datum.name);
          }
        });
      },
      header: /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
        checked: checked.length === _data.DATA.length,
        indeterminate: checked.length > 0 && checked.length < _data.DATA.length,
        onChange: onCheckAll
      }),
      sortable: false
    }].concat(controlledColumns).map(function (col) {
      return _extends({}, col);
    }),
    data: _data.DATA,
    sortable: true,
    size: "medium"
  })));
};

exports.ControlledDataTable = ControlledDataTable;
ControlledDataTable.storyName = 'Controlled';
var _default = {
  title: 'Visualizations/DataTable/Controlled'
};
exports["default"] = _default;